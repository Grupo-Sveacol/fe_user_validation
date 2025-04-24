import { Builder, By, until } from "selenium-webdriver";

// Show option to start KYC verification (HU001)
(async function verifyKYCButton() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Navegar a la URL inicial
    await driver.get("https://pagui-kyc.vercel.app");

    // Esperar a que el botón esté presente
    const startButton = await driver.wait(
      until.elementLocated(By.css("button[aria-label='Next']")),
      5000 // Esperar hasta 5 segundos
    );

    // Verificar que el botón sea visible
    const isDisplayed = await startButton.isDisplayed();
    console.log("Start Verification button is visible:", isDisplayed);

    // Hacer clic en el botón
    await startButton.click();

    // Depurar la URL actual después de hacer clic
    const currentUrl = await driver.getCurrentUrl();
    console.log("Current URL after clicking the button:", currentUrl);

    // Verificar que la URL cambie al siguiente paso
    await driver.wait(until.urlContains("/terms"), 10000); // Aumentar tiempo de espera
    console.log("Redirection to KYC step 1 successful!");
  } catch (error) {
    console.error("Test failed:", error);
  } finally {
    await driver.quit();
  }
})();