const { NEWEST_HEADING } = require("../../config/instagram.config");

const collectNewestDrawPostUrls = async (url, page) => {
  await page.goto(url, {
    waitUntil: "networkidle0",
  });

  // get the newests ones
  try {
    await page.waitFor(() => document.querySelectorAll("h2").length);
  } catch (error) {
    console.log(error);
  }

  const postUrls = await page.evaluate(() => {
    const h2s = document.querySelectorAll("h2");
    const h2 = [...h2s].filter((h2) => h2.innerText === NEWEST_HEADING)[0];
    // get the next sibling of it (all newest content)
    const newestContainer = h2.nextSibling.children[0];
    const postRows = newestContainer.children;
    const postUrls = [];

    // loop through rows
    for (let i = 0; i < postRows.length; i++) {
      const cRow = postRows[i];
      // every children of cRow represents a post
      // first element of every post is a element
      postUrls.push(...[...cRow.children].map((post) => post.children[0].href));
    }

    return postUrls;
  });

  await page.waitFor(2000);
  return postUrls;
};

module.exports = collectNewestDrawPostUrls;
