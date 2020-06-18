import axios from 'axios';
import * as HttpStatus from 'http-status-codes';

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
