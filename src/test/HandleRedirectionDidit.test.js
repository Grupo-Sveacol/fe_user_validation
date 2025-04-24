import { Builder, By, until } from "selenium-webdriver";

// Handle redirection failure from Didit (HU005)
(async function handleRedirectionFailureFromDidit() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("https://pagui-kyc.vercel.app/didit-failure");

    // Esperar a que el mensaje de error esté presente
    const errorMessage = await driver.wait(
      until.elementLocated(By.css("h1.text-3xl.text-primary.font-bold")),
      5000
    );

    // Obtener el texto del mensaje de error
    const text = await errorMessage.getText();
    console.log("Error message displayed:", text);

    // Validar el mensaje de error
    if (!text.includes("ERROR 404")) {
      throw new Error(`Unexpected error message: ${text}`);
    }

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