const EmailService = require("../EmailService");

const createMockProvider = (name, successAfter = 1) => {
  let attempt = 0;
  return {
    name,
    send: async () => {
      attempt++;
      if (attempt < successAfter) {
        throw new Error(`${name} failed`);
      }
      return true;
    }
  };
};

describe("EmailService", () => {
  it("uses fallback provider on failure", async () => {
    const failingProvider = createMockProvider("FailProvider", 100);
    const workingProvider = createMockProvider("GoodProvider", 1);

    const emailService = new EmailService([failingProvider, workingProvider], {
      maxRetries: 1,
      backoffFactor: 1
    });

    const email = { id: "email-123", to: "test@example.com", subject: "", body: "" };

    await emailService.send(email);
    // No assert — we rely on no error and internal logging
  });

  it("retries up to maxRetries", async () => {
    const flakyProvider = createMockProvider("FlakyProvider", 3);

    const emailService = new EmailService([flakyProvider], {
      maxRetries: 3,
      backoffFactor: 1
    });

    const email = { id: "email-456", to: "x@example.com", subject: "", body: "" };

    await emailService.send(email); // should succeed on 3rd attempt
  });
});
