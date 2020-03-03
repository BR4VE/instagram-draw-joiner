// helper imports
const followAccount = require("./followAccount");
const getRandomSeconds = require("./getRandomSeconds");
const getCommentContent = require("../getCommentContent");

const joinDraws = async (postUrls, page) => {
  // loop through pages and visit every of them
  for (let i = 0; i < postUrls.length; i++) {
    const cPost = postUrls[i];
    const currentIntervalForPageSkips = getRandomSeconds(10000, 12000);

    // wait for certain amount of time not to get banned
    await page.waitFor(currentIntervalForPageSkips);
    // go to the url
    await page.goto(cPost, { waitUntil: "networkidle0" });

    // steps for joining a draw (generally)
    // 1. Follow the page who shared the post
    // 2. Like the post picture
    // 3. Bookmark the post
    // 4. Comment 3 (more or less) people in the comment
    // 5. Write "Katılıyorum" (or whatever in your language) to the comment
    // 6. Follow all the accounts written in the description

    await page.evaluate(async () => {
      // define random seconds
      const getRandomSeconds = (min, max) => Math.random() * (max - min) + min;

      // in production 3000, in development 0
      const currentIntervalForActions = getRandomSeconds(25000, 30000);
      // define wait function in console
      const waitFor = async time =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve();
          }, time);
        });

      const buttons = [...document.querySelectorAll("button")];
      const followButton = buttons.filter(
        btn => btn.innerText === "Takip Et"
      )[0];
      const likeButton = buttons.filter(
        btn =>
          btn.children[0] &&
          btn.children[0].getAttribute("aria-label") === "Beğen"
      )[0];
      const bookmarkButton = buttons.filter(
        btn =>
          btn.children[0] &&
          btn.children[0].getAttribute("aria-label") === "Kaydet"
      )[0];
      const commentArea = document.querySelector("textarea");

      // 1.
      // if the button wasn't found that means we've already been following
      followButton && followButton.click();
      await waitFor(currentIntervalForActions);

      // 2.
      likeButton && likeButton.click();
      await waitFor(currentIntervalForActions);

      // 3.
      bookmarkButton && bookmarkButton.click();
      await waitFor(currentIntervalForActions);

      // 4.
      // Cannot achive the behavior of writing to textArea seperately
    });

    // 4-5.
    // sometimes it is not allowed to comment
    try {
      await page.type("textArea", getCommentContent());
      // submit
      await page.evaluate(() => {
        const buttons = [...document.querySelectorAll("button")];
        const shareButton = buttons.filter(
          btn => btn.innerText === "Paylaş"
        )[0];

        shareButton.click();
      });
    } catch (err) {}

    // wait couple seconds before redirecting
    await page.waitFor(5000);

    // 6.
    const followUrls = await page.evaluate(() => {
      // get the second span of the page
      const secSpan = document.querySelectorAll("ul span")[1];
      //
      return [...secSpan.children]
        .filter(
          child =>
            child.tagName === "A" && child.classList.contains("notranslate")
        )
        .map(child => child.href);
    });

    for (let k = 0; k < followUrls.length; k++) {
      const cUrl = followUrls[k];
      await followAccount(cUrl, page);
      await page.waitFor(currentIntervalForPageSkips);
    }
  }
};

module.exports = joinDraws;
