require('dotenv').config();

console.log('process.env.TWITER_TOKEN: ', process.env.TWITER_TOKEN);

const hello = (say: string) => console.log(say);

hello('Hello World');
