import { Builder, By, until } from "selenium-webdriver";

// Button to return to the main page after verification (HU0013)
(async function verifyReturnToHomeButton() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("https://pagui-kyc.vercel.app/verified");

    // Esperar a que el botón "Back" esté presente
    const backButton = await driver.wait(
      until.elementLocated(By.css("button[aria-label='Back']")),
      5000
    );

    // Verificar si el botón "Back" está visible
    const isDisplayed = await backButton.isDisplayed();
    console.log("Back button is visible:", isDisplayed);

    // Hacer clic en el botón "Back"
    await backButton.click();

    // Verificar la redirección a la página principal
    await driver.wait(until.urlIs("https://pagui-kyc.vercel.app/"), 5000);
    console.log("Successfully returned to the home page!");
  } catch (error) {
    console.error("Test failed:", error);
  } finally {
    await driver.quit();
  }
})();