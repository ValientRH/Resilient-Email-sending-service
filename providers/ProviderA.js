class ProviderA {
  constructor() {
    this.name = "ProviderA";
  }

  async send(email) {
    console.log(`[${this.name}] Trying to send email to ${email.to}`);

    await this.simulateDelay(300); // simulate network delay

    const success = Math.random() > 0.3; // 70% success chance

    if (success) {
      console.log(`[${this.name}] Email sent successfully`);
    } else {
      console.log(`[${this.name}] Failed to send email`);
      throw new Error(`${this.name} failed to send email`);
    }
  }

  async simulateDelay(ms) {
    // simulate delay using async/await
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

module.exports = ProviderA;
