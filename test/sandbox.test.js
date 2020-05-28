import PlanGateway from '../lib/gateways/plan-gateway';
import CreatePlan from '../lib/use-cases/create-plan';
import AWS from 'aws-sdk';
import Goal from '../lib/domain/goal';

const config = {
  region: 'local',
  endpoint: 'http://localhost:8000',
  accessKeyId: 'foo',
  secretAccessKey: 'bar'
};

AWS.config.update(config);
const client = new AWS.DynamoDB.DocumentClient(config);

const planGateway = new PlanGateway({
  client,
  tableName: 'plans'
});

const logger = { info: jest.fn(), error: jest.fn() };

const createPlan = new CreatePlan({ planGateway, logger });

describe('my sandbox', () => {
  it('does stuff', async () => {
  //   const plan = await createPlan.execute({
  //     firstName: 'me',
  //     lastName: 'me',
  //     systemIds: ['xyx']
  //   });
  //
  //   plan.goal = new Goal({
  //     targetReviewDate: { year: 2021, month: 3, day: 3 },
  //     text: 'hello',
  //     useAsPhp: true
  //   });
  //
  //   const request = {
  //     TableName: 'plans',
  //     Key: {
  //       id: plan.id
  //     },
  //     UpdateExpression: 'set goal = :g',
  //     ExpressionAttributeValues: {
  //       ':g': plan.goal
  //     },
  //     ReturnValues: 'UPDATED_NEW'
  //   };
  //
  //   const result = await client.update(request).promise();
  });
});
