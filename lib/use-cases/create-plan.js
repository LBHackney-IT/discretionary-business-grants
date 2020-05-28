export default class CreatePlan {
  constructor({ planGateway }) {
    this.planGateway = planGateway;
  }

  async execute({ firstName, lastName, systemIds }) {
    const plan = await this.planGateway.create({
      firstName,
      lastName,
      systemIds
    });

    return {
      id: plan.id,
      firstName: plan.firstName,
      lastName: plan.lastName
    };
  }
}
