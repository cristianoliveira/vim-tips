import dotenv from 'dotenv';
import fs from 'fs';

import tipsData from '../data/tips.json';
import postedData from '../cache/posted.json';

import { TwitterApi } from "twitter-api-v2";

dotenv.config();

// create dir cache if it doesn't exist
if (!fs.existsSync('./cache')) {
    fs.mkdirSync('./cache');
}

const TWITTER_API_KEY = process.env.TWITTER_API_KEY;
const TWITTER_API_KEY_SECRET = process.env.TWITTER_API_SECRET;
const TWITTER_ACCESS_TOKEN = process.env.TWITTER_API_ACCESS_TOKEN;
const TWITTER_ACCESS_TOKEN_SECRET = process.env.TWITTER_API_ACCESS_TOKEN_SECRET;

const client = new TwitterApi({
    // these two values come from your app's API keys
    appKey: TWITTER_API_KEY,
    appSecret: TWITTER_API_KEY_SECRET,

    // these two values come from the user's access tokens
    accessToken: TWITTER_ACCESS_TOKEN,
    accessSecret: TWITTER_ACCESS_TOKEN_SECRET
});

if (!postedData) {
    console.log("MISSING RECORD DATA");
    process.exit(1);
}

if (postedData.posted.length >= tipsData.tips.length) {
    postedData.posted = [];
}

let randIdx = Math.abs(Math.floor(Math.random() * tipsData.tips.length-1));

const hasBeenPosted = (idx) => {
    const hasBeen = postedData.posted.some((i) => i === idx);
    return hasBeen;
}

while (hasBeenPosted(randIdx)) {
    randIdx += 1;
    if (randIdx >= tipsData.tips.length) {
        randIdx = 0;
    }
}

postedData.posted.push(randIdx);
fs.writeFileSync('./data/posted.json', JSON.stringify(postedData));

console.log(`DATA: ${postedData.posted}`);
console.log(`POSTING: ${randIdx}`);
const tip = tipsData.tips[randIdx];
if (!tip) {
    console.log('No tip found');
    process.exit(1);
}

const post = `${tip.title}: ${tip.text}`;
console.log('Posting: ', post);
await client.v2.tweet(post);
