
class IdempotencyStore {
  constructor() {
    this.sentEmailIds = new Set();
  }

  isSent(emailId) {
    return this.sentEmailIds.has(emailId);
  }

  markAsSent(emailId) {
    this.sentEmailIds.add(emailId);
  }
}

module.exports = IdempotencyStore;
