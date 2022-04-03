import { config as loadEnv } from "dotenv";
import cron from "node-cron";

import "./types";
import { makePoster, TwitterConfig } from "./twitter";
import {
  fetchRandomTip,
  fetchArticleDetails,
  formatPost,
} from "./services/wikia";

loadEnv();
const twitterConfigs: TwitterConfig = {
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token: process.env.TWITTER_API_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_API_ACCESS_TOKEN_SECRET,
};

const postTwitter = makePoster(twitterConfigs);
const EVERY_DAY_AT_NINE = "0 9 * * *";

cron.schedule(EVERY_DAY_AT_NINE, () => {
  fetchRandomTip()
    .then(fetchArticleDetails)
    .then(formatPost)
    .then(postTwitter)
    .catch(console.error);
});
