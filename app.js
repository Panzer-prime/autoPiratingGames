const puppeteer = require("puppeteer");

async function searchOnGoogle(searchTerm) {
  const browser = await puppeteer.launch({
    executablePath:
      "C:/Program Files/Google/Chrome/Application/chrome",
    headless: false,
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 1040 });
  await page.goto("https://google.com");

  await page.click("#L2AGLb")
  await page.waitForTimeout(3000); // Wait for 3 seconds before interacting with the element

  await page.waitForSelector("#APjFqb");

  await page.type("#APjFqb", `${searchTerm} steamunlocked`);

  await page.keyboard.press("Enter");

  await page.waitForSelector(`#search`);

  const firstResultLink = await page.$("#search a");
  await firstResultLink.click();

  await page.waitForNavigation();

  // Check if the click was successful
  const currentURL = page.url();
  const pattern = /steamunlocked/; // Replace with your desired pattern or characters

  if (pattern.test(currentURL)) {
    console.log(
      "Ha! You want to do something? Ahh, go and pay for the game, you lazy bastard."
    );

    await page.click(".btn-download");
    await new Promise((resolve) => setTimeout(resolve, 18000));
    await page.waitForSelector(".btn.btn-submit-free.btn-download-free")
    await page.click('.btn.btn-submit-free.btn-download-free');

    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (request.isNavigationRequest() && !pattern.test(request.url())) {
        request.abort();
      } else {
        request.continue();
      }
    });
        
    await new Promise((resolve) => setTimeout(resolve, 18000));

    console.log("Your file download will start shortly.");

    // Place your additional code for file download here
  } else {
    console.log(
      "Failed to click the first link or URL does not match the pattern."
    );
  }

  await browser.close();
}

// Accept user input from the command line
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter your search term: ", (searchTerm) => {
  rl.close();

  if (!searchTerm || searchTerm.trim() === "") {
    console.error("Please enter a valid search term.");
  } else {
    // Call the searchOnGoogle function with the provided search term
    searchOnGoogle(searchTerm);
  }
});
