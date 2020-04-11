const { FOLLOW, FOLLOWING } = require("../../config/instagram.config");

const followAccount = async (url, page) => {
  await page.goto(url, { waitUntil: "networkidle0" });

  try {
    await page.waitFor(() => {
      const buttons = [...document.querySelectorAll("button")];
      const followButton = buttons.filter((btn) => btn.innerText === FOLLOW)[0];
      const unFollowButton = buttons.filter(
        (btn) => btn.innerText === FOLLOWING
      )[0];

      return followButton || unFollowButton;
    });
  } catch (err) {
    // cannot find it
    // dont know why?
  }
  // find the button and click it
  await page.evaluate(() => {
    const buttons = [...document.querySelectorAll("button")];
    const followButton = buttons.filter((btn) => btn.innerText === FOLLOW)[0];

    followButton && followButton.click();
  });
};

module.exports = followAccount;
