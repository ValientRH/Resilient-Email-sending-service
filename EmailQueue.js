// EmailQueue.js
class EmailQueue {
  constructor(emailService, intervalMs = 1000) {
    this.emailService = emailService;
    this.queue = [];
    this.intervalMs = intervalMs;
    this.running = false;
  }

  add(email) {
    console.log(`📥 Queued email to: ${email.to}`);
    this.queue.push(email);
    if (!this.running) this.process();
  }

  async process() {
    this.running = true;

    while (this.queue.length > 0) {
      const email = this.queue.shift();
      await this.emailService.send(email);
      await new Promise(res => setTimeout(res, this.intervalMs)); // wait before next
    }

    this.running = false;
  }
}

module.exports = EmailQueue;
