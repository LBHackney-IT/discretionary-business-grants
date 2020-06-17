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
    expect(databaseSpy).toHaveBeenCalledWith(expect.anything(), [10, 0]);
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
});

// Todo: Test that the pagination parameters get passed through and result in the correct pagination object

// Todo: Test that the correct errors are returned when nonsense passed in or something goes wrong.
