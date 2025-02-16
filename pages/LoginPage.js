import { BasePage } from "./BasePage.js"; // Ensure correct import
import { expect } from "@playwright/test";

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.email = '[name="email"]';
    this.password = '[name="password"]';
    this.loginButton = '[data-test-id="signin"]';
  }

  get strings() {
    return {
      URL: "https://demo.haroldwaste.com/authentication"
    };
  }

  async wait(time) {
    await this.page.waitForTimeout(time); // Waits for 0.5 seconds
  }

  async login(email, password) {
    await this.page.fill(this.email, email);
    await this.wait(500);
    await this.page.fill(this.password, password);
    await this.wait(500);
    await this.page.click(this.loginButton);
    await this.wait(500);
  }

  async assertLoginButtonBackgroundColor() {
    await this.wait(1000);

    // Get the actual background color
    const bgColor = await this.page
      .locator(this.loginButton)
      .evaluate((el) => getComputedStyle(el).backgroundColor);

    // Define the expected colors
    const expectedColors = ["rgb(54, 41, 164)", "rgb(78, 59, 235)"]; // Add your second expected color

    // Assert that the color is one of the expected values
    expect(expectedColors).toContain(bgColor);
  }

  async assertFieldErrorHighlight() {
    await expect(
      this.page.locator('[data-test-id="input-email"] > div')
    ).toHaveCSS("border-color", "rgb(228, 0, 68)");
    await expect(
      this.page.locator('[data-test-id="input-password"] > div')
    ).toHaveCSS("border-color", "rgb(228, 0, 68)");
  }
}

export const lp = (page) => new LoginPage(page);
