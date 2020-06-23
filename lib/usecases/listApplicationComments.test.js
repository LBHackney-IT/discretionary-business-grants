import listApplicationComments from './listApplicationComments';

function createContainerAndDatabaseSpy(numberOfCommentsInResponse) {
  const databaseAnySpy = jest.fn(() => {
    const databaseResponse = [];
    for (let count = 1; count <= numberOfCommentsInResponse; count++) {
      databaseResponse.push({
        date_time_recorded: '2020-06-16T06:16:19.640Z',
        user_recorded: `Some user ${count}`,
        notes: `Some entered text ${count}`
      });
    }
    return databaseResponse;
  });

  const databaseOneSpy = jest.fn(() => {
    return [];
  });

  const container = {
    async getDbInstance() {
      return {
        any: databaseAnySpy,
        one: databaseOneSpy
      };
    }
  };
  return { databaseSpy: databaseAnySpy, container };
}

describe('listApplicationComments', () => {
  test('returns a JSON object containing the comments for an application', async () => {
    const { databaseSpy, container } = createContainerAndDatabaseSpy(10);

    const clientGeneratedId = 'some-client-gen-id';
    const { comments } = await listApplicationComments(container)({
      clientGeneratedId: clientGeneratedId
    });

    expect(databaseSpy).toHaveBeenCalledWith(expect.anything(), {
      clientGeneratedId: expect.stringMatching(clientGeneratedId)
    });
    expect(comments).toHaveLength(10);
    expect(comments[0]).toEqual({
      userRecorded: 'Some user 1',
      dateTimeRecorded: '2020-06-16T06:16:19.640Z',
      notes: 'Some entered text 1'
    });
    expect(comments[9]).toEqual({
      userRecorded: 'Some user 10',
      dateTimeRecorded: '2020-06-16T06:16:19.640Z',
      notes: 'Some entered text 10'
    });
  });

  test('returns an application not found response for non existent application', async () => {
    const { databaseSpy } = createContainerAndDatabaseSpy(1);
    const throwingOneDatabaseSpy = jest.fn(() => {
      throw new Error('Bugger');
    });

    const container = {
      async getDbInstance() {
        return {
          one: throwingOneDatabaseSpy,
          any: databaseSpy
        };
      }
    };

    await listApplicationComments(container)({
      clientGeneratedId: 'does-not-exist-client-gen-id'
    });

    expect(throwingOneDatabaseSpy).toThrow();
  });
});
