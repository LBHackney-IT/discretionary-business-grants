import Router from 'next/router';

import { Button } from 'components/Form';
import { steps, stepPath, stepKeys } from 'components/Steps';

export default function Home() {
  return (
    <div>
      <h1>Discretionary Business Grants</h1>
      <Button
        text="Start"
        onClick={() => Router.push(stepPath, `/step/${stepKeys[0]}`)}
      />
    </div>
  );
}
