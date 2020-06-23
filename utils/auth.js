import axios from 'axios';
import * as HttpStatus from 'http-status-codes';
import { parse } from 'cookie';
import jsonwebtoken from 'jsonwebtoken';

export const getUserFromCookie = cookie =>
  jsonwebtoken.decode(parse(cookie).hackneyToken);

export const redirectIfNotAuth = async ({ req, res, query }) => {
  try {
    const { data } = await axios.get(
      `${process.env.HACKNERY_AUTH_URL}/check_token`,
      {
        headers: req ? { cookie: req.headers.cookie } : undefined
      }
    );
    if (!data.error) {
      return { props: { ...data, ...query } };
    }
  } catch (e) {
    console.error(e.message);
  }
  res.writeHead(HttpStatus.MOVED_TEMPORARILY, {
    Location: `${process.env.HACKNERY_AUTH_URL}?redirect_uri=https://${process
      .env.URL_PREFIX + req.url}`
  });
  res.end();
};
