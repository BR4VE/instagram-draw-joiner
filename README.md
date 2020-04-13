# Instagram Draw Joiner <img src="./img/insta-icon.png" width="48" />

Instagram Draw Joiner is an instagram bot which is able to like, comment (with mentions @), save, follow the account, follow the accounts in the description, the newest posts on a given specific url.

The purpose behind creating this was joining draws (Intagram posts which gives prizes to people randomly), but it might be applied to any concept.

Currently, the abilities are listed above are not designed plugable, draw-joiner completes all of them. In the future it might be changed.

## Sequence of Actions

Drawer completes the tasks listed below in a sequence.

1. Navigating to the login page of Instagram.
2. Logging in with provided credentials.
3. Navigating to the provided URL (example: [https://www.instagram.com/explore/tags/drawing/](https://www.instagram.com/explore/tags/drawing/)).
4. Selecting the all of the posts currently on the page under "Newest" tag.
5. Liking, saving, following, commenting (with provided mentions) to every post that was selected.

## Setup

There are couple configurations you need to do before using the bot after installing all the dependencies with <b>npm i</b>

### Setting up instagram.config.js

1. Locate to the <i>instagram.config.js</i> file under <b>config</b> folder.
2. Change the properties according to be suitable with your language (If you want you can skip this part, but be sure that the urls you are going to provide will be rendered as the same language as you've chosen).
3. You are done with this file.

### Setting up joinDraws.js

1. Locate to the <i>joinDraws.js</i> file under <b> helpers -> puppeteer</b> folder.
2. Change the url as you want while respecting to these facts:
   - The url you provide must fit with the language you set in <i>instagram.config.js</i> file (/<b>?hl=[The abbreviation of the language you choose]</b>)
   - The url you provide must contain "The Newest" heading. In short the page must be a "explore" page.
3. You are done.

### Setting up getCommentContent.js

1. Locate to the <i>getCommentContent.js</i> under <b>helpers</b> folder.
2. Change the prefix, afterfix and mentions array (currently they are in Turkish). This file generates random comments based on your prefixes and after fixes with including the mentions. The generated comment are wirtten to posts (1 generated comment per post).
   - For example: <prefix=Join>! @mertbtmz @mertbtmz @mertbtmz <afterfix=you should also join!>

### Setting up .env

1. You need to create a .env file at the root folder of the app.
2. You need to fill this file with (without brackets):

```js
	INSTA_ACCOUNT_MAIL=[yourmail@someprovider.com]
	INSTA_ACCOUNT_PASSWORD=[yourpass]
```

3. You are done with all setting up

## Running & Deploying

After making configurations, your app is ready to take request to /join_draw route, you can run it with <b>node index</b>. If you make requests from your own local machine, puppeter will run a headfull cromium browser and you will be able to see what is happening.

This repo is configured to deploy to Google App Engine. If you are planning to deploy here you don't need to do any additional configuration. - On production the app will be headless - I've set 3 different schedules (cron jobs) for different times of the day. In general the app will run 3 times a day (for GAE of course).

### Things to consider when running & deploying

- In order not to spam Instagram Interface & APIs, I've set timeouts between every action (for example after locating to a post page wait at least 15 seconds before liking commenting etc.). Please be respectful and do not change the time limitations.
- Also set schedulers (like cron jobs) for requests, do not make lots of and lots of requests.

## Questions & Feedback

I would like to answer any questions raised based on this project and I would be so glad if you provide me any positive or negative feedback. You can contact me at <a href="mailto:mertbatmazoglu@gmail.com" target="_blank">mertbatmazoglu@gmail.com</a>
