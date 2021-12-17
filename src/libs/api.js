import axios from 'axios';

export const client = axios.create({
  baseURL: 'https://asia-northeast3-co-eat-server.cloudfunctions.net/api',
});
