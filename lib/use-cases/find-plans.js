export default class FindPlans {
  constructor({ planGateway }) {
    this.planGateway = planGateway;
  }

  async execute(request) {
    return await this.planGateway.find(request);
  }
}
