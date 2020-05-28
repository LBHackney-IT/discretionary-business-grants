import { addGoal } from '../../lib/dependencies';
import { useState } from 'react';
import AddAction from '../../components/Feature/AddAction';
import AddGoal from '../../components/Feature/AddGoal';
import SummaryList from '../../components/Form/SummaryList';

const PlanSummary = ({ editGoal, initialPlan }) => {
  const [plan, setPlan] = useState(initialPlan);
  const { id, firstName, lastName, goal } = plan;

  const getPossessiveName = (firstName, lastName) => {
    let baseString = `${firstName} ${lastName}'`;
    if (lastName === '') {
      baseString = `${firstName}'`;
    }
    if (baseString[baseString.length - 2] !== 's') {
      baseString += 's';
    }
    return baseString;
  };

  const updatePlan = async newPlan => {
    setPlan(newPlan);
  };

  return (
    <>
      <h1>{getPossessiveName(firstName, lastName)} shared plan</h1>
      {editGoal ? (
        <AddGoal addGoalUseCase={addGoal} planId={id} />
      ) : (
        <SummaryList
          name="goal-summary"
          listObject={{
            Goal: goal.text
          }}
        />
      )}
      <AddAction id={id} updatePlan={updatePlan} />
    </>
  );
};

PlanSummary.getInitialProps = async ({ query, res }) => {
  const response = await fetch(
    `${process.env.SHARED_PLAN_API_URL}/plans/${query.id}`
  );
  if (response.status === 404) {
    res.statusCode = 404;
    return res.end('Not found');
  }

  const plan = await response.json();

  return {
    editGoal: !plan.goal ? true : false,
    initialPlan: {
      id: plan.id,
      firstName: plan.firstName,
      lastName: plan.lastName
    }
  };
};

export default PlanSummary;
