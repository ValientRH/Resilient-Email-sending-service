// StatusTracker.js
class StatusTracker {
  constructor() {
    this.statuses = new Map(); // emailId => status object
  }

  start(emailId) {
    this.statuses.set(emailId, {
      success: false,
      attempts: 0,
      provider: null,
      message: "Sending not started"
    });
  }

  update(emailId, data) {
    const current = this.statuses.get(emailId) || {};
    this.statuses.set(emailId, { ...current, ...data });
  }

  get(emailId) {
    return this.statuses.get(emailId);
  }

  print(emailId) {
    const status = this.get(emailId);
    console.log(`📊 Status for ${emailId}:`, status);
  }
}

module.exports = StatusTracker;
