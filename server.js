// server.js
const express = require("express");
const bodyParser = require("body-parser");

const ProviderA = require("./providers/ProviderA");
const ProviderB = require("./providers/ProviderB");
const EmailService = require("./EmailService");

const providerA = new ProviderA();
const providerB = new ProviderB();

const emailService = new EmailService([providerA, providerB], {
  maxRetries: 2,
  backoffFactor: 2000,
});

const app = express();
app.use(bodyParser.json());

app.post("/send-email", async (req, res) => {
  const email = req.body;

  if (!email.id || !email.to || !email.subject || !email.body) {
    return res.status(400).json({ error: "Missing fields" });
  }

  console.log(`📨 API Request received for email to ${email.to}`);

  try {
    await emailService.send(email);
    res.status(200).json({ message: "Email sent or queued" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
