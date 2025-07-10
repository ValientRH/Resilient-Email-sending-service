# Resilient Email Sending Service

This project is a Node.JS-based email sending service designed to be fault-tolerant and reliable. It simulates real-world challenges like provider failures, rate limiting, and duplicate requests. The service is built in JavaScript and uses mock providers to mimic actual email APIs services.

---

Features

- Retries with exponential backoff in case of failure
- Switches to another provider if one fails consistently
- Prevents duplicate email sends using idempotency logic
- Limits how many emails can be sent in a short time
- Tracks status of each email (provider used, success, attempts)
- Includes bonus features like a basic queue system, simple logging, and a circuit breaker pattern

---

## Live Demo (Cloud API)
https://resilient-email-sending-service-shubham.onrender.com


