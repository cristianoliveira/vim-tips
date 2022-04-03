import express from "express";
import http from "http";
import "dotenv/config";

import {
  fetchRandomTip,
  fetchArticleDetails,
  formatPost,
} from "./services/wikia";
import { makePoster, TwitterConfig } from "./twitter";

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 4000;
// It isn't a great api authentication but it does the job for now.
const apiSecret = process.env.VIM_TIPS_API_SECRET || "api-secret";

const twitterConfigs: TwitterConfig = {
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token: process.env.TWITTER_API_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_API_ACCESS_TOKEN_SECRET,
};

const postToTwitter = makePoster(twitterConfigs);

app.use(express.json());
app.get("/", async (req: express.Request, res: express.Response) => {
  const routes = [
    {
      method: "GET",
      path: "/tips",
      description: "Responds with a random vim tip.",
    },
    { method: "POST", path: "/twitter", description: "Post a tip to twitter." },
  ];

  res.json({ routes });
});

app.get("/tips", async (req: express.Request, res: express.Response) => {
  const tip = await fetchRandomTip();
  const details = await fetchArticleDetails(tip);

  res.json({ tip, details });
});

app.post("/twitter", async (req: express.Request, res: express.Response) => {
  const { secret }: { secret: string } = req.body;

  if (secret !== apiSecret) {
    return res.status(403).send("Not authorized.");
  }

  const tip = await fetchRandomTip();
  const article = await fetchArticleDetails(tip);

  try {
    await postToTwitter(formatPost(article));

    return res.json({ message: "Tip successfully published", tip });
  } catch (e) {
    console.error(e);
    return res.status(500).send("Error while publishing to twitter");
  }
});

server.listen(port, () => {
  console.log("listening on:", port);
});
