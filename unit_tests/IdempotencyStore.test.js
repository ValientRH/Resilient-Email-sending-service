const IdempotencyStore = require("../IdempotencyStore");

describe("IdempotencyStore", () => {
  it("returns false for new IDs", () => {
    const store = new IdempotencyStore();
    expect(store.isSent("abc")).toBe(false);
  });

  it("marks an email ID as sent", () => {
    const store = new IdempotencyStore();
    store.markAsSent("email-001");
    expect(store.isSent("email-001")).toBe(true);
  });
});
