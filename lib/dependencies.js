import AddGoal from './use-cases/add-goal';
import AddAction from './use-cases/add-action';
import GetPlan from './use-cases/get-plan';
import CreatePlan from './use-cases/create-plan';
import FindPlans from './use-cases/find-plans';
import PlanGateway from './gateways/plan-gateway';
import { logger, withLogging } from './infrastructure/logging';
import AWS from 'aws-sdk';

const config = {
  region: process.env.AWS_REGION,
  endpoint: 'http://localhost:8000',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
};

const planGateway = new PlanGateway({
  client: new AWS.DynamoDB.DocumentClient(config),
  tableName: process.env.PLANS_TABLE_NAME
});

const addGoal = withLogging(new AddGoal({ planGateway }), logger);
const getPlan = withLogging(new GetPlan({ planGateway, logger }), logger);
const createPlan = withLogging(new CreatePlan({ planGateway, logger }), logger);
const findPlans = withLogging(new FindPlans({ planGateway, logger }), logger);
const addAction = withLogging(new AddAction({ planGateway, logger }), logger);
export { addGoal, createPlan, getPlan, findPlans, addAction };

