export default class Action {
  constructor({ summary, description, dueDate }) {
    this.summary = summary;
    this.description = description;
    this.dueDate = getDueDate(dueDate);
  }
}

const getDueDate = dueDate => {
  if (typeof dueDate === 'string') return dueDate;
  return new Date(dueDate.year, dueDate.month - 1, dueDate.day).toISOString();
};
