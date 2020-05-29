import Router from 'next/router';

import { Button } from 'components/Form';

export default function Home() {
  return (
    <div>
      <h1>Discretionary Business Grants!</h1>
      <Button
        text="Start"
        onClick={() => Router.push('/step/[id]', '/step/1')}
      />
    </div>
  );
}
