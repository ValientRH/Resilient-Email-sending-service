const ProviderA = require("./providers/ProviderA");
const ProviderB = require("./providers/ProviderB");
const EmailService = require("./EmailService");
const EmailQueue = require("./EmailQueue");

const providerA = new ProviderA();
const providerB = new ProviderB();

const emailService = new EmailService([providerA, providerB], {
  maxRetries: 2,
  backoffFactor: 2000
});

// ✅ Use EmailQueue
const queue = new EmailQueue(emailService, 1000); // 1 email/sec

const emails = [
  { id: "email-001", to: "user1@example.com", subject: "Hello", body: "Email 1" },
  { id: "email-002", to: "user2@example.com", subject: "Hello", body: "Email 2" },
  { id: "email-003", to: "user3@example.com", subject: "Hello", body: "Email 3" },
  { id: "email-004", to: "user4@example.com", subject: "Hello", body: "Email 4" },
  { id: "email-005", to: "user5@example.com", subject: "Hello", body: "Email 5" }
];

(async () => {
  console.log("🚀 Queuing emails...");

  // Add to queue (will be sent one-by-one)
  emails.forEach(email => {
    queue.add(email);
  });

  // Wait until all are processed (give enough buffer)
  await new Promise(res => setTimeout(res, 15000));
  console.log("✅ All queued emails sent.");
})();
