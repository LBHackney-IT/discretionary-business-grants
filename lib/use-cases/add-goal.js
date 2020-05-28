import Goal from '../domain/goal';

export default class AddGoal {
  constructor({ planGateway }) {
    this.planGateway = planGateway;
  }

  async execute({ planId, goal }) {
    const existingPlan = await this.planGateway.get({ id: planId });

    if (!existingPlan) {
      throw new Error('no plan found.');
    }

    existingPlan.goal = new Goal({
      targetReviewDate: goal.targetReviewDate,
      text: goal.text,
      useAsPhp: goal.useAsPhp
    });

    return await this.planGateway.save({ plan: existingPlan });
  }
}
