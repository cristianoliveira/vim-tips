import twit from "twit";

export const makePoster = (): any => {
  const config = {
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET,
    access_token: process.env.TWITTER_API_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_API_ACCESS_TOKEN_SECRET,
  };

  const Twitter = new twit(config);
  return (msg: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      Twitter.post("statuses/update", { status: msg }, (err, data) => {
        if (err) {
          return reject(err);
        }

        resolve(data);
      });
    });
  };
};
