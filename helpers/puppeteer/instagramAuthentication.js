const { CLOSE_BUTTON, LOGIN_URL } = require("../../config/instagram.config");

const instagramAuthentication = async (page) => {
  page.on("console", (msg) => {
    for (let i = 0; i < msg._args.length; ++i) console.log(`${msg._args[i]}`);
  });

  await page.goto(LOGIN_URL, { waitUntil: "networkidle0" });

  // wait until the input elements full loaded
  try {
    await page.waitFor(() => document.querySelectorAll("input").length);
  } catch (err) {
    console.log(err);
  }

  // type the credentials
  await page.type("[name=username]", process.env.INSTA_ACCOUNT_MAIL);
  await page.type("[name=password", process.env.INSTA_ACCOUNT_PASSWORD);

  // press the submit button
  await page.evaluate(() => {
    // find the button
    const submitButton = document.querySelector("[type=submit]");
    submitButton.click();
    // this will make the redirection
  });

  let popupAvailable = true;
  // after the login pass the notification popup
  try {
    await page.waitFor(() => document.querySelector("div[role='dialog']"));
  } catch (err) {
    // that means there is no popup
    popupAvailable = false;
  }

  if (!popupAvailable) return await page.waitFor(1500);

  // if popup available pass it
  await page.evaluate(() => {
    // find the not now button
    const buttons = document.querySelectorAll("button");
    // the text on the button might change based on the language
    const closeButton = [...buttons].filter(
      (button) => button.innerText === CLOSE_BUTTON
    )[0];

    closeButton.click();
  });

  await page.waitFor(1500);
};

module.exports = instagramAuthentication;
