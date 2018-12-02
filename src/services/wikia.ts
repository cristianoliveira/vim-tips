import axios from 'axios';
import randomItem from 'random-item';

export const WIKI_URL = 'http://vim.wikia.com';
const API = `${WIKI_URL}/api/v1`;

type WikiaArticle = {
  id: string;
  title: string;
  url: string;
  ns: number;
};

type WikiaArticleDetail = {
  id: string;
  title: string;
  url: string;
  ns: number;
  revision: object;
  type: string;
  abstract: string;
  thumbnail: string;
  original_dimensions: string; // eslint-disable-line camelcase
};

type WikiaArticleDetails = {
  items: Array<WikiaArticleDetail>;
};

export const fetchRandomTip = (): Promise<WikiaArticle> =>
  axios
    .get(`${API}/Articles/MostLinked`)
    .then(articles => randomItem(articles.data.items));

export const fetchArticleDetails = ({
  id,
}: object): Promise<WikiaArticleDetail> =>
  axios
    .get(`${API}/Articles/Details?&abstract=100&width=200&height=200&ids=${id}`)
    .then(({ data }) => data.items[id]);

export const formatPost = (article: WikiaArticleDetail): string =>
  `Vim tip of the day:
${article.title}
${article.abstract}

${WIKI_URL}${article.url}
`;
