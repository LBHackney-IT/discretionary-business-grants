import listApplicationComments from './listApplicationComments';
import { APPLICATION_NOT_FOUND } from '../constants';

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
  return { databaseAnySpy, container };
}

describe('listApplicationComments', () => {
  test('returns a JSON object containing the comments for an application', async () => {
    const { databaseAnySpy, container } = createContainerAndDatabaseSpy(10);

    const clientGeneratedId = 'some-client-gen-id';
    const { comments } = await listApplicationComments(container)({
      clientGeneratedId: clientGeneratedId
    });

    expect(databaseAnySpy).toHaveBeenCalledWith(expect.anything(), {
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
    const { databaseAnySpy } = createContainerAndDatabaseSpy(1);
    const expectedErrorName = 'QueryResultError';
    const expectedErrorCode = 0;
    const throwingOneDatabaseSpy = jest.fn(() => {
      let error = new Error(APPLICATION_NOT_FOUND);
      error.name = expectedErrorName;
      error.code = expectedErrorCode;
      throw error;
    });
    const container = {
      async getDbInstance() {
        return {
          one: throwingOneDatabaseSpy,
          any: databaseAnySpy
        };
      }
    };

    const commentsResponse = await listApplicationComments(container)({
      clientGeneratedId: 'does-not-exist-client-gen-id'
    });

    expect(commentsResponse.comments).toBeNull();
    expect(commentsResponse.error).toEqual(APPLICATION_NOT_FOUND);
  });
});
