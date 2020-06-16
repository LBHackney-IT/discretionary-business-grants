import axios from 'axios';
import * as HttpStatus from 'http-status-codes';

import ApplicationsList from 'components/ApplicationsList/ApplicationsList';

const AdminPage = ({ name }) => (
  <>
    <h1>Hello {name}</h1>
    <ApplicationsList />
  </>
);

export async function getServerSideProps({ req, res }) {
  try {
    const { data } = await axios.get(
      `${process.env.HACKNERY_AUTH_URL}/check_token`,
      {
        headers: req ? { cookie: req.headers.cookie } : undefined
      }
    );
    if (!data.error) {
      return { props: data };
    }
  } catch (e) {
    console.error(e.message);
  }
  res.writeHead(HttpStatus.MOVED_PERMANENTLY, {
    Location: `${process.env.HACKNERY_AUTH_URL}?redirect_uri=https://${process
      .env.URL_PREFIX + req.url}`
  });
  res.end();
}

export default AdminPage;
