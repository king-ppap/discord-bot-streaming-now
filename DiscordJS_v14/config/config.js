import dotenv from 'dotenv';
dotenv.config();
import { env } from 'process';

const {
  BOT_TOKEN,
  APP_ID,
  API_CLIENT_SECRET,
} = env;

export const CONFIG = {
  BOT_TOKEN,
  APP_ID,
  API_CLIENT_SECRET,
  SETTINGS: {
    events: { 
      listenStreamerLiveRules: ['streamer'],
    },
  }
};
