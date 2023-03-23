import "dotenv/config";

import {
  fetchRandomTip,
  fetchArticleDetails,
  formatPost,
} from "../services/wikia";

import { makePoster, TwitterConfig } from "../twitter";

const twitterConfigs: TwitterConfig = {
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token: process.env.TWITTER_API_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_API_ACCESS_TOKEN_SECRET,
};

const postToTwitter = makePoster(twitterConfigs);

const post = async () => {
  const tip = await fetchRandomTip();
  const article = await fetchArticleDetails(tip);

  try {
    await postToTwitter(formatPost(article));

    console.log("Tip successfully published");
  } catch (e) {
    console.error(e);
  }
};

post();
