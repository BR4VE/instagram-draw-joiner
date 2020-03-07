// helper imports
const followAccount = require("./followAccount");
const getRandomSeconds = require("./getRandomSeconds");
const getCommentContent = require("../getCommentContent");

const joinDraws = async (postUrls, page) => {
  // loop through pages and visit every of them
  for (let i = 0; i < postUrls.length; i++) {
    // redirecting turkish page
    const cPost = postUrls[i] + "?hl=tr";
    const currentIntervalForPageSkips = getRandomSeconds(10000, 12000);
    console.log("Current post url, we are going to redirect", cPost);
    console.log(
      "Current skip interval for page skips",
      currentIntervalForPageSkips
    );

    // wait for certain amount of time not to get banned
    await page.waitFor(currentIntervalForPageSkips);
    // go to the url
    await page.goto(cPost, { waitUntil: "networkidle0" });

    console.log("Redirected to url");

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

      console.log(
        "Current interval time for actions",
        currentIntervalForActions
      );
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

      console.log("This is the follow button", followButton);
      console.log("This is the like button", likeButton);
      console.log("This is the bookmark button", bookmarkButton);
      console.log("This is the comment area", commentArea);

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

      console.log("Completed current actions");

      // 4.
      // Cannot achive the behavior of writing to textArea seperately
    });

    // 4-5.
    // sometimes it is not allowed to comment
    try {
      await page.type("textArea", getCommentContent());

      console.log("typed to textArea with random comment");
      // submit
      await page.evaluate(() => {
        const buttons = [...document.querySelectorAll("button")];
        const shareButton = buttons.filter(
          btn => btn.innerText === "Paylaş"
        )[0];

        console.log("This is the comment sharing button ", shareButton);

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

    console.log("These accounts must be followed ", followUrls);

    for (let k = 0; k < followUrls.length; k++) {
      const cUrl = followUrls[k] + "?hl=tr";
      await followAccount(cUrl, page);
      await page.waitFor(currentIntervalForPageSkips);
    }
  }
};

module.exports = joinDraws;
