import { useState, useEffect } from 'react';
import axios from 'axios';

import ApplicationsList from 'components/ApplicationsList/ApplicationsList';

const AdminPage = ({ name }) => {
  const [applications, setApplications] = useState();
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get('/api/applications');
      setApplications(data.applications);
    }
    fetchData();
  }, []);
  return (
    <>
      <h1>Hello {name}</h1>
      {applications && <ApplicationsList applications={applications} />}
    </>
  );
};

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
  res.writeHead(301, {
    Location: `${process.env.HACKNERY_AUTH_URL}?redirect_uri=https://${process
      .env.URL_PREFIX + req.url}`
  });
  res.end();
}

export default AdminPage;
