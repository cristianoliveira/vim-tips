import twit from "twit";

export type TwitterConfig = {
  consumer_key: string;
  consumer_secret: string;
  access_token: string;
  access_token_secret: string;
};

export const makePoster = (config: TwitterConfig): any => {
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
