require('dotenv').config();

import { post } from './twitter';
import {
  fetchRandomTip,
  fetchArticleDetails,
  formatPost,
} from './services/wikia';

const postTwitter = post();

fetchRandomTip()
  .then(fetchArticleDetails)
  .then(formatPost)
  .then(postTwitter);
