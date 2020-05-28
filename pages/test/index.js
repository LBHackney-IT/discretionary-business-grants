export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/api/test`); // need env var for our base url
  const data = await res.json();
  return { props: { data } };
}

export default function Test({ data }) {
  return <div>{data.message}</div>;
}
