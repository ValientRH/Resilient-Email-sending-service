const CircuitBreaker = require("../CircuitBreaker");

describe("CircuitBreaker", () => {
  it("allows access initially", () => {
    const cb = new CircuitBreaker(2, 1000);
    expect(cb.canTry("ProviderA")).toBe(true);
  });

  it("blocks after threshold is reached", () => {
    const cb = new CircuitBreaker(2, 5000);
    cb.recordFailure("ProviderA");
    cb.recordFailure("ProviderA");
    expect(cb.canTry("ProviderA")).toBe(false);
  });

  it("unblocks after cooldown time", async () => {
    const cb = new CircuitBreaker(1, 1000);
    cb.recordFailure("ProviderB");
    expect(cb.canTry("ProviderB")).toBe(false);
    await new Promise(res => setTimeout(res, 1100));
    expect(cb.canTry("ProviderB")).toBe(true);
  });

  it("resets failure count on success", () => {
    const cb = new CircuitBreaker(1, 1000);
    cb.recordFailure("ProviderC");
    cb.reset("ProviderC");
    expect(cb.canTry("ProviderC")).toBe(true);
  });
});
