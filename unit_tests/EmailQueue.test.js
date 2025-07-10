const EmailQueue = require("../EmailQueue");

describe("EmailQueue", () => {
  it("queues and processes emails with delay", async () => {
    const processed = [];

    const mockService = {
      send: async (email) => {
        processed.push(email.id);
      }
    };

    const queue = new EmailQueue(mockService, 100);
    queue.add({ id: "email-1", to: "a@example.com" });
    queue.add({ id: "email-2", to: "b@example.com" });
    queue.add({ id: "email-3", to: "c@example.com" });

    await new Promise(res => setTimeout(res, 500));
    expect(processed).toEqual(["email-1", "email-2", "email-3"]);
  });
});
