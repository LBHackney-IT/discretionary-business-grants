import React, { useState } from 'react';
import { DateInput, TextInput, Button } from '../../Form';
import TextArea from '../../Form/TextArea';

const AddAction = ({ id, updatePlan }) => {
  const [summary, setActionSummary] = useState('');
  const [dueDate, setDueDate] = useState({});
  const [description, setActionDescription] = useState('');

  const handleActionSummaryChange = e => {
    setActionSummary(e.target.value);
  };

  const handleDueDateChange = e => {
    if (e.target.name.includes('day'))
      setDueDate({
        ...dueDate,
        day: parseInt(e.target.value)
      });
    if (e.target.name.includes('month'))
      setDueDate({
        ...dueDate,
        month: parseInt(e.target.value)
      });
    if (e.target.name.includes('year'))
      setDueDate({
        ...dueDate,
        year: parseInt(e.target.value)
      });
  };

  const handleActionDescriptionChange = e => {
    setActionDescription(e.target.value);
  };

  const [buttonClassName, buttonDisabled] =
    summary && dueDate.year && dueDate.month && dueDate.day
      ? ['govuk-button', '']
      : ['govuk-button govuk-button--disabled', 'disabled'];

  const onClick = async id => {
    const action = {
      summary,
      description,
      dueDate
    };

    const response = await fetch(
      `${process.env.SHARED_PLAN_API_URL}/plans/${id}/actions`,
      {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(action)
      }
    );
    const plan = await response.json();
    if (plan) await updatePlan(plan);
  };

  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-third">
            <h2 className="govuk-heading-m">Our Actions</h2>
          </div>
          <div className="govuk-grid-column-two-thirds">
            <h2 className="govuk-heading-m">Add new action</h2>
            <TextInput
              name="summary-text"
              label="Summary"
              onChange={handleActionSummaryChange}
            />
            <TextArea
              name="full-description"
              label="Full description(optional)"
              onChange={handleActionDescriptionChange}
            />
            <DateInput
              name="due-date"
              title="Due date"
              onChange={handleDueDateChange}
            />
            <Button
              className={buttonClassName}
              disabled={buttonDisabled}
              text="Add to plan"
              data-testid="add-action-button-test"
              onClick={() => onClick(id)}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddAction;
