const instagramAuthentication = async page => {
  await page.goto(
    "https://www.instagram.com/accounts/login/?hl=tr&source=auth_switcher",
    { waitUntil: "networkidle0" }
  );

  // wait until the input elements full loaded
  await page.waitFor(() => document.querySelectorAll("input").length);

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

  // after the login pass the notification popup
  await page.waitFor(() => document.querySelector("div[role='dialog']"));

  await page.evaluate(() => {
    // find the not now button
    const buttons = document.querySelectorAll("button");
    // the text on the button might change based on the language
    const closeButton = [...buttons].filter(
      button => button.innerText === "Şimdi Değil"
    )[0];

    closeButton.click();
  });

  await page.waitFor(1500);
};

module.exports = instagramAuthentication;
