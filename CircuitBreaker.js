// CircuitBreaker.js
class CircuitBreaker {
  constructor(failureThreshold = 3, cooldownTime = 30000) {
    this.failureThreshold = failureThreshold;
    this.cooldownTime = cooldownTime;
    this.failures = new Map(); // providerName → count
    this.blockedUntil = new Map(); // providerName → timestamp
  }

  canTry(providerName) {
    const blockedUntil = this.blockedUntil.get(providerName) || 0;
    return Date.now() > blockedUntil;
  }

  recordFailure(providerName) {
    const count = (this.failures.get(providerName) || 0) + 1;
    this.failures.set(providerName, count);

    if (count >= this.failureThreshold) {
      const unblockAt = Date.now() + this.cooldownTime;
      this.blockedUntil.set(providerName, unblockAt);
      console.log(`🚫 Circuit breaker tripped for ${providerName} until ${new Date(unblockAt).toLocaleTimeString()}`);
    }
  }

  reset(providerName) {
    this.failures.set(providerName, 0);
    this.blockedUntil.set(providerName, 0);
  }
}

module.exports = CircuitBreaker;
