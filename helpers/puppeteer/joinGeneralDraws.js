// helper imports
const puppeteerContainer = require("./puppeteerContainer");
const instagramAuthentication = require("./instagramAuthentication");
const collectNewestDrawPostUrls = require("./collectNewestDrawPostUrls");

const joinDraws = require("./joinDraws");

const joinGeneralDraws = async (page) => {
  // authenticate
  await instagramAuthentication(page);
  const postUrls = await collectNewestDrawPostUrls(
    // change the url as you want
    // Be careful about the language abbreviation at the end
    "https://www.instagram.com/explore/tags/%C3%A7ekili%C5%9F/?hl=en",
    page
  );
  await joinDraws(postUrls, page);
};

module.exports = puppeteerContainer(joinGeneralDraws);
