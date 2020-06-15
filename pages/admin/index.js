import axios from 'axios';

const AdminPage = ({ name }) => {
  return (
    <>
      <h1>Hello {name}</h1>
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
