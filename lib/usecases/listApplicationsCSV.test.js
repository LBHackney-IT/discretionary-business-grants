import listApplicationsCSV from './listApplicationsCSV';

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

describe('listApplicationsCSV', () => {
  test('returns a CSV object containing all applications', async () => {
    const { databaseAnySpy, container } = createContainerAndDatabaseSpy(10);

    expect(true).toBe(false);

    const { comments } = await listApplicationsCSV(container)();
    //
    // expect(databaseAnySpy).toHaveBeenCalledWith(expect.anything(), {
    // clientGeneratedId: expect.stringMatching(clientGeneratedId)
    // });
    // expect(comments).toHaveLength(10);
    // expect(comments[0]).toEqual({
    // userRecorded: 'Some user 1',
    // dateTimeRecorded: '2020-06-16T06:16:19.640Z',
    // notes: 'Some entered text 1'
    // });
    // expect(comments[9]).toEqual({
    // userRecorded: 'Some user 10',
    // dateTimeRecorded: '2020-06-16T06:16:19.640Z',
    // notes: 'Some entered text 10'
    // });
  });
});
