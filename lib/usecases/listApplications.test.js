import listApplications from './listApplications';

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

describe('listApplications', () => {
  // Todo: Test that the correct errors are returned when nonsense passed in or something goes wrong.
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
      sortBy: expect.anything(),
      sortDirection: expect.anything()
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
      sortBy: expect.anything(),
      sortDirection: expect.anything()
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
      sortBy: expect.anything(),
      sortDirection: expect.anything()
    });
  });

  test('defaults sort param to +applicationDate', async () => {
    const { databaseSpy, container } = createContainerAndDatabaseSpy(0);

    const { error } = await listApplications(container)({});

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(expect.anything(), {
      pageSize: expect.anything(),
      offset: expect.anything(),
      sortBy: 'ga.date_time_recorded',
      sortDirection: 'ASC'
    });
  });

  test('passes through sort param', async () => {
    const { databaseSpy, container } = createContainerAndDatabaseSpy(0);

    const { error } = await listApplications(container)({
      sort: '+businessName'
    });

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(expect.anything(), {
      pageSize: expect.anything(),
      offset: expect.anything(),
      sortBy: 'b.business_name',
      sortDirection: 'ASC'
    });
  });

  test('sets sort ascending for +...', async () => {
    const { databaseSpy, container } = createContainerAndDatabaseSpy(0);

    const { error } = await listApplications(container)({
      sort: '+businessName'
    });

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(expect.anything(), {
      pageSize: expect.anything(),
      offset: expect.anything(),
      sortBy: expect.anything(),
      sortDirection: 'ASC'
    });
  });

  test('parameters are included in the query', async () => {
    const { databaseSpy, container } = createContainerAndDatabaseSpy(0);

    const { error } = await listApplications(container)({});

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(
      expect.stringContaining('LIMIT $(pageSize) OFFSET $(offset)'),
      expect.anything()
    );
  });

  test('sort is included in the query', async () => {
    const { databaseSpy, container } = createContainerAndDatabaseSpy(0);

    const { error } = await listApplications(container)({});

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(
      expect.stringContaining('ORDER BY ga.date_time_recorded ASC'),
      expect.anything()
    );
  });
});
