import { Builder, By, until } from "selenium-webdriver";

// Show contact option after rejection (HU0011)
(async function verifyContactOptionAfterRejection() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("https://pagui-kyc.vercel.app/rejected");

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
    console.log("Back button clicked successfully!");
  } catch (error) {
    console.error("Test failed:", error);
  } finally {
    await driver.quit();
  }
})();