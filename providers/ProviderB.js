class ProviderB {
  constructor() {
    this.name = "ProviderB";
  }

  async send(email) {
    console.log(`[${this.name}] Trying to send email to ${email.to}`);

    await this.simulateDelay(300);

    const success = Math.random() > 0.5; // 50% success chance

    if (success) {
      console.log(`[${this.name}] Email sent successfully`);
    } else {
      console.log(`[${this.name}] Failed to send email`);
      throw new Error(`${this.name} failed to send email`);
    }
  }

  async simulateDelay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

module.exports = ProviderB;
