const puppeteer = require("puppeteer");

const puppeteerContainer = func => async () => {
  const browser = await puppeteer.launch({
    headless: process.env.NODE_ENV === "production",
    args: ["--no-sandbox"]
  });
  const page = await browser.newPage();

  // run the inner func
  await func(page, browser);

  // close the browser
  await browser.close();

  console.log("exiting the crawling process");
};

module.exports = puppeteerContainer;
