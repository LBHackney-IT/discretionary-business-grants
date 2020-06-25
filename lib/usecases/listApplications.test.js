import * as axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import * as faker from 'faker';
import listApplications from './listApplications';
import { APPLICATION_STATE } from 'lib/dbMapping';
import { TYPE_OF_BUSINESS } from 'lib/dbMapping';

function createContainerAndDatabaseSpy(numberOfApplicationsInResponse) {
  const databaseSpy = jest.fn(() => {
    const databaseResponse = [];
    for (let count = 1; count <= numberOfApplicationsInResponse; count++) {
      databaseResponse.push({
        date_time_recorded: '2020-06-16T06:16:19.640Z',
        client_generated_id: `ClientGeneratedId${count}`,
        business_name: `Business Name ${count}`,
        status: 'Unprocessed'
      });
    }
    return databaseResponse;
  });

  const container = {
    async getDbInstance() {
      return {
        any: databaseSpy
      };
    }
  };
  return { databaseSpy, container };
}

describe.skip('listApplications', () => {
  // Todo: Test that the correct errors are returned when nonsense passed in or something goes wrong.

  const grantOfficersResponse = { grantOfficers: [] };
  const expectedGrantOfficers = [];
  for (let x = 1; x <= 3; x++) {
    const identifier =
      `${faker.name.firstName()} ${faker.name.lastName()}` +
      ` <${faker.internet.exampleEmail()}>`;
    expectedGrantOfficers.push(identifier);
    grantOfficersResponse.grantOfficers.push({ identifier });
  }

  beforeAll(() => {
    const axiosMockAdapter = new AxiosMockAdapter(axios);
    axiosMockAdapter
      .onGet(`${process.env.URL_PREFIX}/api/grant-officers`)
      .reply(200, grantOfficersResponse);
  });

  test('returns a JSON object containing the applications', async () => {
    const { databaseSpy, container } = createContainerAndDatabaseSpy(10);

    const { applications, error } = await listApplications(container)({
      currentPage: 1,
      pageSize: 10
    });

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(expect.anything(), {
      pageSize: 10,
      offset: 0,
      statesFilter: expect.anything(),
      businessTypeFilter: expect.anything(),
      grantOfficerFilter: expect.anything()
    });
    expect(applications).toHaveLength(10);
    expect(applications[0]).toEqual({
      clientGeneratedId: 'ClientGeneratedId1',
      businessName: 'Business Name 1',
      applicationDate: '2020-06-16T06:16:19.640Z',
      status: 'Unprocessed'
    });
    expect(applications[9]).toEqual({
      clientGeneratedId: 'ClientGeneratedId10',
      businessName: 'Business Name 10',
      applicationDate: '2020-06-16T06:16:19.640Z',
      status: 'Unprocessed'
    });
  });

  test('defaults currentPage to 1 and pageSize to 10', async () => {
    const { databaseSpy, container } = createContainerAndDatabaseSpy(0);

    const { error } = await listApplications(container)({});

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(expect.anything(), {
      pageSize: 10,
      offset: 0,
      statesFilter: expect.anything(),
      businessTypeFilter: expect.anything(),
      grantOfficerFilter: expect.anything()
    });
  });

  test('passes through currentPage and pageSize', async () => {
    const { databaseSpy, container } = createContainerAndDatabaseSpy(10);

    const { error } = await listApplications(container)({
      currentPage: 2,
      pageSize: 3
    });

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(expect.anything(), {
      pageSize: 3,
      offset: 3,
      statesFilter: expect.anything(),
      businessTypeFilter: expect.anything(),
      grantOfficerFilter: expect.anything()
    });
  });

  test('defaults sort param to +applicationDate', async () => {
    const { databaseSpy, container } = createContainerAndDatabaseSpy(0);

    const { error } = await listApplications(container)({});

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(
      expect.stringContaining('ORDER BY ga.date_time_recorded ASC'),
      expect.anything()
    );
  });

  test('passes through sort param', async () => {
    const { databaseSpy, container } = createContainerAndDatabaseSpy(0);

    const { error } = await listApplications(container)({
      sort: '+businessName'
    });

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(
      expect.stringContaining('ORDER BY LOWER(b.business_name) ASC'),
      expect.anything()
    );
  });

  test('sets sort ascending for +...', async () => {
    const { databaseSpy, container } = createContainerAndDatabaseSpy(0);

    const { error } = await listApplications(container)({
      sort: '+businessName'
    });

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(
      expect.stringContaining('ORDER BY LOWER(b.business_name) ASC'),
      expect.anything()
    );
  });

  test('sets sort ascending for -...', async () => {
    const { databaseSpy, container } = createContainerAndDatabaseSpy(0);

    const { error } = await listApplications(container)({
      sort: '-businessName'
    });

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(
      expect.stringContaining('ORDER BY LOWER(b.business_name) DESC'),
      expect.anything()
    );
  });

  test('limit and offset parameters are included in the query', async () => {
    const { databaseSpy, container } = createContainerAndDatabaseSpy(0);

    const { error } = await listApplications(container)({});

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(
      expect.stringContaining('LIMIT $(pageSize) OFFSET $(offset)'),
      expect.anything()
    );
  });

  test('application state ids are included in the query', async () => {
    const { databaseSpy, container } = createContainerAndDatabaseSpy(0);

    const { error } = await listApplications(container)({});

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(
      expect.stringContaining('WHERE aa.application_state_id IN '),
      expect.anything()
    );
  });

  test('when status is undefined all known states is included in the query', async () => {
    const { databaseSpy, container } = createContainerAndDatabaseSpy(0);

    const { error } = await listApplications(container)({ status: undefined });

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        offset: expect.any(Number),
        pageSize: expect.any(Number),
        statesFilter: expect.arrayContaining([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
      })
    );
  });

  test('when status is defined & found, only that status is queried', async () => {
    const { databaseSpy, container } = createContainerAndDatabaseSpy(0);
    const statusIndex = 0;
    const desiredStatus = APPLICATION_STATE[statusIndex];
    const expectedStatus = statusIndex + 1;

    const { error } = await listApplications(container)({
      status: desiredStatus
    });

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        offset: expect.any(Number),
        pageSize: expect.any(Number),
        statesFilter: expect.arrayContaining([expectedStatus])
      })
    );
  });

  test('business type ids are included in the query', async () => {
    const { databaseSpy, container } = createContainerAndDatabaseSpy(0);

    const { error } = await listApplications(container)({});

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        'ec.business_type_id IN ($(businessTypeFilter:list))'
      ),
      expect.anything()
    );
  });

  test('when businessType is undefined a list of known businessTypes is included in the query', async () => {
    const { databaseSpy, container } = createContainerAndDatabaseSpy(0);

    const { error } = await listApplications(container)({
      businessType: undefined
    });

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        offset: expect.any(Number),
        pageSize: expect.any(Number),
        statesFilter: expect.any(Array),
        businessTypeFilter: expect.arrayContaining([1, 2, 3, 4, 5, 6, 7])
      })
    );
  });

  test('when businessType is defined & found, only that businessType is queried', async () => {
    const { databaseSpy, container } = createContainerAndDatabaseSpy(0);
    const typeIndex = 0;
    const desiredType = TYPE_OF_BUSINESS[typeIndex];
    const expectedType = typeIndex + 1;

    const { error } = await listApplications(container)({
      businessType: desiredType
    });

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        offset: expect.any(Number),
        pageSize: expect.any(Number),
        statesFilter: expect.any(Array),
        businessTypeFilter: expect.arrayContaining([expectedType])
      })
    );
  });

  test('grant officers are included in the query', async () => {
    const { databaseSpy, container } = createContainerAndDatabaseSpy(0);

    const { error } = await listApplications(container)({});

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        'ah.user_recorded IN ($(grantOfficerFilter:list))'
      ),
      expect.anything()
    );
  });

  test('when grantOfficer is undefined a list of known grantOfficer are included in the query', async () => {
    const { databaseSpy, container } = createContainerAndDatabaseSpy(0);

    const { error } = await listApplications(container)({
      grantOfficer: undefined
    });

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        offset: expect.any(Number),
        pageSize: expect.any(Number),
        statesFilter: expect.any(Array),
        businessTypeFilter: expect.any(Array),
        grantOfficerFilter: expect.arrayContaining(expectedGrantOfficers)
      })
    );
  });

  test('when grantOfficer is defined & found, only that grantOfficer is queried', async () => {
    const { databaseSpy, container } = createContainerAndDatabaseSpy(0);
    const expectedGrantOfficer = expectedGrantOfficers.pop();

    const { error } = await listApplications(container)({
      grantOfficer: expectedGrantOfficer
    });

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        offset: expect.any(Number),
        pageSize: expect.any(Number),
        statesFilter: expect.any(Array),
        businessTypeFilter: expect.any(Array),
        grantOfficerFilter: expect.arrayContaining([expectedGrantOfficer])
      })
    );
  });
});
