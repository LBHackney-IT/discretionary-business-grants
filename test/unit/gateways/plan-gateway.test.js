import PlanGateway from '../../../lib/gateways/plan-gateway';
import { ArgumentError, Goal, Plan } from '../../../lib/domain';

describe('Plan Gateway', () => {
  let client;
  const tableName = 'plans';

  beforeEach(() => {
    client = {
      put: jest.fn(request => ({
        promise: jest.fn(() => ({ Items: [request.Item] }))
      })),
      query: jest.fn(() => ({ promise: jest.fn() })),
      update: jest.fn(() => ({ promise: jest.fn() }))
    };
  });

  describe('create', () => {
    it('throws an error if firstName is not provided', async () => {
      const planGateway = new PlanGateway({ client, tableName });

      await expect(async () => {
        await planGateway.create({ lastName: 'name' });
      }).rejects.toThrow(ArgumentError);

      expect(client.put).not.toHaveBeenCalled();
    });

    it('throws an error if lastName is not provided', async () => {
      const planGateway = new PlanGateway({ client });

      await expect(async () => {
        await planGateway.create({ firstName: 'name' });
      }).rejects.toThrow(ArgumentError);

      expect(client.put).not.toHaveBeenCalled();
    });

    it('can create a plan', async () => {
      const firstName = 'Trevor';
      const lastName = 'McLevor';

      const expectedRequest = {
        TableName: tableName,
        Item: expect.objectContaining({
          id: expect.any(String),
          firstName,
          lastName,
          queryFirstName: firstName.toLowerCase(),
          queryLastName: lastName.toLowerCase()
        })
      };
      const planGateway = new PlanGateway({ client, tableName });

      const result = await planGateway.create({ firstName, lastName });

      expect(client.put).toHaveBeenCalledWith(expectedRequest);
      expect(result).toBeInstanceOf(Plan);
      expect(result.id).toStrictEqual(expect.any(String));
      expect(result.id.length).toBe(20);
      expect(result.firstName).toEqual(firstName);
      expect(result.lastName).toEqual(lastName);
    });
  });

  describe('get', () => {
    it('throws an error if id is null', async () => {
      const planGateway = new PlanGateway({ client, tableName });

      await expect(async () => {
        await planGateway.get({ id: null });
      }).rejects.toThrow(ArgumentError);
      expect(client.query).not.toHaveBeenCalled();
    });

    it('can get a plan', async () => {
      const id = 1;
      const firstName = 'Trevor';
      const lastName = 'McLevor';

      client.query = jest.fn(() => ({
        promise: jest.fn(() => ({ Items: [{ id, firstName, lastName }] }))
      }));
      const expectedRequest = {
        TableName: tableName,
        KeyConditionExpression: 'id = :id',
        ExpressionAttributeValues: {
          ':id': id
        }
      };
      const planGateway = new PlanGateway({ client, tableName });

      const result = await planGateway.get({ id });

      expect(client.query).toHaveBeenCalledWith(expectedRequest);
      expect(result).toBeInstanceOf(Plan);
      expect(result.id).toEqual(id);
      expect(result.firstName).toEqual(firstName);
      expect(result.lastName).toEqual(lastName);
    });

    it('can return null if plan does not exist', async () => {
      client.query = jest.fn(() => ({
        promise: jest.fn(() => ({ Items: [] }))
      }));
      const planGateway = new PlanGateway({ client, tableName });

      const result = await planGateway.get({ id: 1 });

      expect(result).toBeNull();
    });
  });

  describe('find', () => {
    it('throws an error if first name is missing', async () => {
      const planGateway = new PlanGateway({ client, tableName });

      await expect(async () => {
        await planGateway.find({});
      }).rejects.toThrow('first name cannot be null.');
      expect(client.query).not.toHaveBeenCalled();
    });

    it('throws an error if last name is missing', async () => {
      const planGateway = new PlanGateway({ client, tableName });

      await expect(async () => {
        await planGateway.find({ firstName: 'Linda' });
      }).rejects.toThrow('last name cannot be null.');
      expect(client.query).not.toHaveBeenCalled();
    });

    it('can find matching plans by name', async () => {
      const customerData = {
        id: '123',
        firstName: 'Barry',
        lastName: 'Jones'
      };

      client.query = jest.fn(() => ({
        promise: jest.fn(() => ({ Items: [customerData] }))
      }));

      const expectedRequest = {
        TableName: tableName,
        IndexName: 'NamesIndex',
        KeyConditionExpression: 'queryLastName = :l and queryFirstName = :f',
        ExpressionAttributeValues: {
          ':f': customerData.firstName.toLowerCase(),
          ':l': customerData.lastName.toLowerCase()
        }
      };

      const planGateway = new PlanGateway({ client, tableName });

      const result = await planGateway.find({
        firstName: customerData.firstName,
        lastName: customerData.lastName
      });

      expect(client.query).toHaveBeenCalledWith(expectedRequest);
      expect(result).toStrictEqual({ planIds: ['123'] });
    });

    it('filters plans using system ids', async () => {
      const customerData = {
        firstName: 'Tom',
        lastName: 'Jones',
        systemIds: ['HH123456']
      };

      client.query.mockImplementation(request => {
        if (request.KeyConditionExpression === 'id = :id') {
          return {
            promise: () =>
              Promise.resolve({
                Items: [customerData]
              })
          };
        }

        return {
          promise: () =>
            Promise.resolve({
              Items: [
                {
                  id: '123',
                  firstName: customerData.firstName,
                  lastName: customerData.lastName,
                  systemIds: ['ABC123456']
                },
                {
                  id: '456',
                  firstName: customerData.firstName,
                  lastName: customerData.lastName,
                  systemIds: ['HH123456']
                }
              ]
            })
        };
      });

      const planGateway = new PlanGateway({ client, tableName });
      const result = await planGateway.find(customerData);
      expect(result).toEqual({ planIds: ['456'] });
    });

    it('returns empty array when no matching plans', async () => {
      client.query = jest.fn(() => ({
        promise: jest.fn(() => ({ Items: [] }))
      }));
      const planGateway = new PlanGateway({ client, tableName });

      const result = await planGateway.find({
        firstName: 'Janos',
        lastName: 'Manos'
      });

      expect(result).toEqual({ planIds: [] });
    });
  });

  describe('save', () => {
    it('saves the plan', async () => {
      const plan = new Plan({
        id: 1,
        firstName: 'John',
        lastName: 'Smith',
        systemIds: ['5']
      });

      plan.goal = new Goal({
        targetReviewDate: { year: 2021, month: 3, day: 3 },
        text: 'hello',
        useAsPhp: true
      });

      const expectedRequest = {
        TableName: tableName,
        Key: {
          id: plan.id
        },
        UpdateExpression: 'set goal = :g',
        ExpressionAttributeValues: {
          ':g': plan.goal
        },
        ReturnValues: 'UPDATED_NEW'
      };

      const planGateway = new PlanGateway({ client, tableName });

      const result = await planGateway.save({ plan });

      expect(client.update).toHaveBeenCalledWith(expectedRequest);
      expect(result).toBeInstanceOf(Plan);
      expect(result.goal).not.toBeNull();
    });

    it('throws an error if plan is null', async () => {
      const planGateway = new PlanGateway({ client, tableName });

      await expect(async () => {
        await planGateway.save({});
      }).rejects.toThrow('plan cannot be null.');
      expect(client.update).not.toHaveBeenCalled();
    });
  });
});
