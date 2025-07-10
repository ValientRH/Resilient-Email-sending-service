const StatusTracker = require("../StatusTracker");

describe("StatusTracker", () => {
  it("initializes a new email ID", () => {
    const tracker = new StatusTracker();
    tracker.start("email-001");
    const status = tracker.get("email-001");
    expect(status.success).toBe(false);
    expect(status.attempts).toBe(0);
  });

  it("updates the status correctly", () => {
    const tracker = new StatusTracker();
    tracker.start("email-001");
    tracker.update("email-001", { success: true, attempts: 2 });
    const status = tracker.get("email-001");
    expect(status.success).toBe(true);
    expect(status.attempts).toBe(2);
  });
});
