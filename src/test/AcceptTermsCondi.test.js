import { Builder, By, until } from "selenium-webdriver";

// Accept terms and conditions (HU002)
(async function verifyAcceptTerms() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("https://pagui-kyc.vercel.app/terms");

    // Simular desplazamiento al final de los términos
    const termsContent = await driver.findElement(By.css("a[aria-label='Read all terms first']"));
    await driver.executeScript("arguments[0].scrollTop = arguments[0].scrollHeight", termsContent);

    // Esperar un momento para que el botón se habilite
    await driver.sleep(2000);

    // Esperar a que el botón "Aceptar" esté presente
    const acceptButton = await driver.wait(
      until.elementLocated(By.css("button[aria-label='Accept']")),
      10000 // Aumentar tiempo de espera
    );

    // Verificar si el botón está habilitado
    const isEnabled = await acceptButton.isEnabled();
    console.log("Accept button is enabled:", isEnabled);

    if (!isEnabled) {
      throw new Error("Accept button is disabled. Ensure all terms are read before enabling.");
    }

    // Hacer clic en el botón "Aceptar"
    await acceptButton.click();

    // Verificar la redirección
    await driver.wait(until.urlContains("/didit"), 5000);
    console.log("Redirection to the next step successful!");
  } catch (error) {
    console.error("Test failed:", error);
  } finally {
    await driver.quit();
  }
})();