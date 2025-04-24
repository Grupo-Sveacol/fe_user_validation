import { Builder, By } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";

// Responsive desing on mobile devices (HU001, HU002)
(async function verifyResponsiveDesign() {
  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options().windowSize({ width: 375, height: 812 })) // Tamaño de iPhone X
    .build();

  try {
    await driver.get("https://pagui-kyc.vercel.app");

    // Verificar si el texto principal es visible
    const mainText = await driver.findElement(By.css("h1.text-2xl"));
    const isDisplayed = await mainText.isDisplayed();
    console.log("Main text is visible on mobile:", isDisplayed);

    // Verificar el contenido del texto
    const textContent = await mainText.getText();
    console.log("Main text content:", textContent);

    // Normalizar texto para comparación
    const normalizeText = (text) =>
      text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    if (normalizeText(textContent) !== normalizeText("Bienvenido a la Experiencia Pagüi")) {
      throw new Error(`Unexpected main text content: ${textContent}`);
    }
  } catch (error) {
    console.error("Test failed:", error);
  } finally {
    await driver.quit();
  }
})();