import { defineConfig } from "@playwright/test";

export default defineConfig({
  timeout: 60000,
  use: {
    browserName: "chromium", // Use Chromium-based browsers
    channel: "chrome", // Ensures Chrome is used
    headless: false, // Set to `true` if you want headless mode
    screenshot: "on", // Captures screenshots on failure
    trace: "on", // Enables tracing for debugging
    video: "on" // Records video of the test run
  },
  env: {
    EMAIL: "qa@julesai.com",
    PASSWORD: "QaJULES2023!"
  },
  reporter: [["html", { outputFolder: "playwright-report" }]] // Generates an HTML report
});
