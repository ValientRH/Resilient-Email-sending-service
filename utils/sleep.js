// utils/sleep.js
const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = sleep;
