import { test, expect } from "@playwright/test";
import { lp } from "../pages/LoginPage.js"; // Ensure correct path
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

test.describe.serial("Login Tests", () => {
  let loginPage; // Declare loginPage globally

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext(); // Create a new browser context
    const page = await context.newPage(); // Open a new page
    loginPage = lp(page); // Instantiate LoginPage
  });

  test("User should not be able to login without entering email and password", async () => {
    await loginPage.navigate(loginPage.strings.URL); // Navigate to login page
    await loginPage.login("", ""); // Leave fields empty
    await loginPage.assertFieldErrorHighlight(); // Assert red border
  });

  test("Login button should have correct background color", async () => {
    await loginPage.assertLoginButtonBackgroundColor();
  });

  test("User should be able to log in after entering email and password", async () => {
    await loginPage.navigate(loginPage.strings.URL); // Navigate to login page
    await loginPage.login(process.env.EMAIL, process.env.PASSWORD); // Perform login
    await expect(loginPage.page).toHaveURL(
      "https://demo.haroldwaste.com/authentication"
    ); // Validate the URL
  });

  test.afterAll(async () => {
    await loginPage.page.close(); // Close the page after all tests
  });
});
