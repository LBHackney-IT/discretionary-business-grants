export default class GetPlan {
  constructor({ planGateway, logger }) {
    this.planGateway = planGateway;
    this.logger = logger;
  }

  async execute({ id }) {
    const plan = await this.planGateway.get({ id });

    if (!plan) {
      this.logger.info('No plan found', { id });
      return null;
    }

    return {
      id: plan.id,
      firstName: plan.firstName,
      lastName: plan.lastName
    };
  }
}
