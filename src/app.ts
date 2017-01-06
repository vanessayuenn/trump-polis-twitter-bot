import * as Polis from '../polis-api/api';
import * as Swagger from 'swagger-client';
import * as Twitter from 'Twitter';
import * as dotenv from 'dotenv';


dotenv.config({
  silent: true,    // for dev env only
  path: '.dev-env'
});

// For @RealDonaldTrump
const TRUMP_ID = '25073877';
const TWITTER_ID = process.env.TWITTER_NUM_ID || TRUMP_ID;
const POLIS_API_KEY = process.env.POLIS_API_KEY;

const TWEET_TEMPLATE = "@{} Hey all, this might be a better way to discuss our differences on this tweet: https://pol.is/{} Beep-boop. I'm a bot.";

const twitClient = Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET,
});
const stream = twitClient.stream(
  'statuses/filter',
  // {follow: TWITTER_ID}
  {track: 'raptors'}
);
stream.on('data', (event) => {
  console.log('incoming tweets', event.text);
});
stream.on('error', (error) => {
  console.log(error);
});



const conversationApi = new Polis.ConversationsApi();
conversationApi.setApiKey(Polis.ConversationsApiApiKeys.api_key, POLIS_API_KEY);
// console.log(conversationApi);
// conversationApi.createConversation();
