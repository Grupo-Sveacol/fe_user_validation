import { Builder, By, until } from "selenium-webdriver";

// Behavior when the page fails to load (HU001)
(async function verifyErrorPage() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Navegar a una página inexistente
    await driver.get("https://pagui-kyc.vercel.app/non-existent-page");

    // Esperar a que el mensaje de error esté presente
    const errorMessage = await driver.wait(
      until.elementLocated(By.css("h1.text-3xl.text-primary.font-bold")), // Selector actualizado
      5000
    );

    // Verificar el texto del mensaje de error
    const text = await errorMessage.getText();
    console.log("Error message displayed:", text);

    // Validar que el texto sea "ERROR 404"
    if (text !== "ERROR 404") {
      throw new Error(`Unexpected error message: ${text}`);
    }
  } catch (error) {
    console.error("Test failed:", error);
  } finally {
    await driver.quit();
  }
})();