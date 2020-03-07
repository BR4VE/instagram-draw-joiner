const puppeteer = require("puppeteer");

const puppeteerContainer = func => async () => {
  const browser = await puppeteer.launch({
    headless: process.env.NODE_ENV === "production",
    args: ["--no-sandbox"]
  });
  const page = await browser.newPage();

  // set it to Turkish
  // it becemos English on the server side, if we dont provde it
  // and most of our work doesn't work
  await page.setExtraHTTPHeaders({
    "Accept-Language": "tr"
  });

  // run the inner func
  await func(page, browser);

  // close the browser
  await browser.close();

  console.log("exiting the crawling process");
};

module.exports = puppeteerContainer;
