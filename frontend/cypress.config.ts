import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://127.0.0.1:3000",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.{js,jsx,ts,tsx}",

    // Extended timeouts for SSR + network-heavy tests
    defaultCommandTimeout: 120000,   // 2 minutes for commands
    pageLoadTimeout: 120000,         // 2 minutes for page load
    requestTimeout: 60000,           // 1 minute for network requests
    responseTimeout: 60000,

    // Stability and security tweaks
    chromeWebSecurity: false,
    video: false,
    screenshotOnRunFailure: true,
    retries: 0,

    // Optional setupNodeEvents hook (for plugin-based Chrome flags)
    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser = {}, launchOptions) => {
        if (browser.name === "chrome" && browser.isHeadless) {
          launchOptions.args.push("--disable-gpu");
          launchOptions.args.push("--no-sandbox");
          launchOptions.args.push("--remote-debugging-port=9222");
        }
        return launchOptions;
      });
      return config;
    },
  },

  // Global environment variables
  env: {
    backendUrl: "http://localhost:8000/api/",
    NO_SANDBOX: true,
  },

  // Explicit browser config (ensures Chrome stable)
  browser: "chrome",
});