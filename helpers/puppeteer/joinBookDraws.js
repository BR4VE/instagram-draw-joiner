// helper imports
const puppeteerContainer = require("./puppeteerContainer");
const instagramAuthentication = require("./instagramAuthentication");
const collectNewestDrawPostUrls = require("./collectNewestDrawPostUrls");

const joinDraws = require("./joinDraws");

const joinBookDraws = async page => {
  // authenticate
  await instagramAuthentication(page);
  const postUrls = await collectNewestDrawPostUrls(
    "https://www.instagram.com/explore/tags/kitapcekilisi/?hl=tr",
    page
  );
  await joinDraws(postUrls, page);
};

module.exports = puppeteerContainer(joinBookDraws);
