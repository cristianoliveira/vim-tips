import { config as loadEnv } from 'dotenv';
import cron from 'node-cron';

import './types';
import { makePoster } from './twitter';
import {
  fetchRandomTip,
  fetchArticleDetails,
  formatPost,
} from './services/wikia';

loadEnv();
const postTwitter = makePoster();
const EVERY_DAY_AT_NINE = '0 9 * * *';

cron.schedule(EVERY_DAY_AT_NINE, () => {
  fetchRandomTip()
    .then(fetchArticleDetails)
    .then(formatPost)
    .then(postTwitter)
    .catch(console.error);
});
