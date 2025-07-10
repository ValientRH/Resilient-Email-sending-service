const RateLimiter = require("../RateLimiter");

describe("RateLimiter", () => {
  it("should allow up to 3 calls per second", () => {
    const limiter = new RateLimiter(3, 1000);
    
    expect(limiter.isAllowed()).toBe(true);
    expect(limiter.isAllowed()).toBe(true);
    expect(limiter.isAllowed()).toBe(true);
    expect(limiter.isAllowed()).toBe(false); // 4th call blocked
  });

  it("should reset after 1 second", async () => {
    const limiter = new RateLimiter(2, 1000);

    limiter.isAllowed(); // call 1
    limiter.isAllowed(); // call 2

    expect(limiter.isAllowed()).toBe(false); // limit hit

    await new Promise(res => setTimeout(res, 1000)); // wait 1s
    expect(limiter.isAllowed()).toBe(true); // should allow again
  });
});
