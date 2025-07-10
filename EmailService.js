const sleep = require("./utils/sleep");
const IdempotencyStore = require("./IdempotencyStore");
const RateLimiter = require("./RateLimiter");
const StatusTracker = require("./StatusTracker");
const Logger = require("./Logger");
const CircuitBreaker = require("./CircuitBreaker");

class EmailService {
  constructor(providers, options = {}) {
    this.idempotencyStore = new IdempotencyStore();
    this.rateLimiter = new RateLimiter(3, 1000); // max 3 emails per 1000ms (1 sec)
    this.providers = providers; // list of email providers
    this.maxRetries = options.maxRetries || 3;
    this.backoffFactor = options.backoffFactor || 1000; // base delay in ms
    this.statusTracker = new StatusTracker();
    this.circuitBreaker = new CircuitBreaker(2, 20000); // fail 2 times → block for 20 sec
  }

  async send(email) {
    console.log(`\n📨 Sending email to: ${email.to}`);
    this.statusTracker.start(email.id);

    if (this.idempotencyStore.isSent(email.id)) {
      Logger.warn(
        `Duplicate detected: Email with ID ${email.id} was already sent. Skipping.`
      );
      return;
    }

    if (!this.rateLimiter.isAllowed()) {
      Logger.error(
        `Rate limit exceeded for email ID ${email.id}. Try again later.`
      );
      this.statusTracker.update(email.id, {
        success: false,
        message: "Rate limit exceeded",
      });
      this.statusTracker.print(email.id);
      return;
    }

    for (let i = 0; i < this.providers.length; i++) {
      const provider = this.providers[i];
      let attempt = 0;

      while (attempt <= this.maxRetries) {
        if (!this.circuitBreaker.canTry(provider.name)) {
          console.log(`⚡ Skipping ${provider.name} — circuit is open.`);
          continue; // skip this provider
        }
        try {
          console.log(`🔄 Trying ${provider.name}, attempt ${attempt + 1}`);
          await provider.send(email);
          this.circuitBreaker.reset(provider.name);
          this.statusTracker.update(email.id, {
            attempts: attempt + 1,
            provider: provider.name,
            success: true,
            message: `Email sent via ${provider.name}`,
          });

          console.log(`✅ Email sent via ${provider.name}`);
          this.idempotencyStore.markAsSent(email.id);
          this.statusTracker.print(email.id);
          return; // success, exit
        } catch (err) {
          this.circuitBreaker.recordFailure(provider.name);
          console.log(`❌ Failed with ${provider.name}: ${err.message}`);

          if (attempt < this.maxRetries) {
            const delay = this.backoffFactor * 2 ** attempt;
            console.log(`⏳ Retrying in ${delay} ms...`);
            await sleep(delay);
          }

          attempt++;
        }
      }

      console.log(`🔁 Switching to next provider...`);
    }

    Logger.error(`All providers failed for email ID ${email.id}.`);
    this.statusTracker.update(email.id, {
      success: false,
      message: "All providers failed",
    });
    this.statusTracker.print(email.id);
  }
}

module.exports = EmailService;
