export default class Plan {
  constructor({ id, created, goal, firstName, lastName, systemIds }) {
    this.id = id;
    this.created = created ? created : new Date(Date.now()).toISOString();
    this.firstName = firstName;
    this.goal = goal || null;
    this.lastName = lastName;
    this.systemIds = systemIds || [];
  }
}
