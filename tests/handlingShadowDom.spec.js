// Use ES module import syntax
import { test, expect } from "@playwright/test";

test("Type into input inside nested shadow DOM", async ({ page }) => {
  // Navigate to the page
  await page.waitForTimeout(60000);
  await page.goto("https://selectorshub.com/iframe-in-shadow-dom/");

  // Step 1: Locate the first shadow root host
  const firstShadowHost = page.locator("#userName");

  // Step 2: Enter the first shadow root
  const firstShadowRoot = await firstShadowHost.evaluateHandle(
    (el) => el.shadowRoot
  );

  // Step 3: Locate the second shadow root host inside the first shadow root
  const secondShadowHost = await firstShadowRoot.evaluateHandle((shadowRoot) =>
    shadowRoot.querySelector('#app2[qaid="country"]')
  );

  // Step 4: Enter the second shadow root
  const secondShadowRoot = await secondShadowHost.evaluateHandle(
    (el) => el.shadowRoot
  );

  // Step 5: Locate the input field inside the second shadow root
  const pizzaInput = await secondShadowRoot.evaluateHandle((shadowRoot) =>
    shadowRoot.querySelector("input#pizza")
  );

  // Step 6: Type into the input field
  await page.evaluate((el) => (el.value = "Margherita pizza"), pizzaInput);

  // Step 7: Assert that the input contains the expected text
  const value = await page.evaluate((el) => el.value, pizzaInput);
  expect(value).toBe("Margherita pizza");
});
