// RateLimiter.js
class RateLimiter {
  constructor(limit, intervalMs) {
    this.limit = limit; // how many emails allowed
    this.intervalMs = intervalMs; // in how much time (ms)
    this.timestamps = []; // track send timestamps
  }

  isAllowed() {
    const now = Date.now();

    // Remove old timestamps (older than intervalMs)
    this.timestamps = this.timestamps.filter(
      (timestamp) => now - timestamp < this.intervalMs
    );

    if (this.timestamps.length < this.limit) {
      this.timestamps.push(now); // allow and log timestamp
      return true;
    } else {
      return false; // too many requests, deny
    }
  }
}

module.exports = RateLimiter;
