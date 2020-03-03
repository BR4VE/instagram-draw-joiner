const followAccount = async (url, page) => {
  await page.goto(url, { waitUntil: "networkidle0" });

  await page.waitFor(() => {
    const buttons = [...document.querySelectorAll("button")];
    const followButton = buttons.filter(btn => btn.innerText === "Takip Et")[0];
    const unFollowButton = buttons.filter(
      btn => btn.innerText === "Takiptesin"
    )[0];

    return followButton || unFollowButton;
  });
  // find the button and click it
  await page.evaluate(() => {
    const buttons = [...document.querySelectorAll("button")];
    const followButton = buttons.filter(btn => btn.innerText === "Takip Et")[0];

    followButton && followButton.click();
  });
};

module.exports = followAccount;
