import listApplications from './listApplications';

describe('listApplications', () => {
  test('returns a JSON object containing the applications', async () => {
    const databaseSpy = jest.fn(() => {
      const databaseResponse = [];
      for (let count = 1; count <= 10; count++) {
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

    const { applications, error } = await listApplications(container)({
      currentPage: 1,
      pageSize: 10
    });

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(expect.anything(), [
      10,
      0,
      expect.anything(),
      expect.anything()
    ]);
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
    const databaseSpy = jest.fn(() => {
      return [];
    });

    const container = {
      async getDbInstance() {
        return {
          any: databaseSpy
        };
      }
    };

    const { error } = await listApplications(container)({});

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(expect.anything(), [
      10,
      0,
      expect.anything(),
      expect.anything()
    ]);
  });

  test('passes through currentPage and pageSize', async () => {
    const databaseSpy = jest.fn(() => {
      const databaseResponse = [];
      for (let count = 1; count <= 10; count++) {
        databaseResponse.push({
          date_time_recorded: '2020-06-16T06:16:19.640Z', // Does not matter
          client_generated_id: 'does-not-matter',
          business_name: 'does-not-matter',
          status: 'does-not-matter'
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

    const { error } = await listApplications(container)({
      currentPage: 2,
      pageSize: 3
    });

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(expect.anything(), [
      3,
      3,
      expect.anything(),
      expect.anything()
    ]);
  });

  test('defaults sort param to +applicationDate', async () => {
    const databaseSpy = jest.fn(() => {
      return [];
    });

    const container = {
      async getDbInstance() {
        return {
          any: databaseSpy
        };
      }
    };

    const { error } = await listApplications(container)({});

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(expect.anything(), [
      expect.anything(),
      expect.anything(),
      'ga.date_time_recorded',
      'ASC'
    ]);
  });

  test('passes through sort param', async () => {
    const databaseSpy = jest.fn(() => {
      return [];
    });

    const container = {
      async getDbInstance() {
        return {
          any: databaseSpy
        };
      }
    };

    const { error } = await listApplications(container)({
      sort: '+businessName'
    });

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(expect.anything(), [
      expect.anything(),
      expect.anything(),
      'b.business_name',
      'ASC'
    ]);
  });

  test('sets sort ascending for +...', async () => {
    const databaseSpy = jest.fn(() => {
      return [];
    });

    const container = {
      async getDbInstance() {
        return {
          any: databaseSpy
        };
      }
    };

    const { error } = await listApplications(container)({
      sort: '+businessName'
    });

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(expect.anything(), [
      expect.anything(),
      expect.anything(),
      expect.anything(),
      'ASC'
    ]);
  });
});

// Todo: Test that the correct errors are returned when nonsense passed in or something goes wrong.
