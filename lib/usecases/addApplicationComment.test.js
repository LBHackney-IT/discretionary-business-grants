import { APPLICATION_NOT_FOUND, NOTES_MUST_NOT_BE_EMPTY } from '../constants';
import addApplicationComment from './addApplicationComment';

function createContainerAndDatabaseSpy() {
  const databaseOneSpy = jest.fn(() => {
    return [];
  });
  const databaseNoneSpy = jest.fn(() => {
    return [];
  });

  const container = {
    async getDbInstance() {
      return {
        none: databaseNoneSpy,
        one: databaseOneSpy
      };
    }
  };
  return { databaseNoneSpy, container };
}

describe('addApplicationComment', () => {
  test('adds comment to application', async () => {
    const { databaseNoneSpy, container } = createContainerAndDatabaseSpy();

    const clientGeneratedId = 'some-client-gen-id';
    const notes = 'some notes';
    const { error } = await addApplicationComment(container)({
      clientGeneratedId,
      userRecorded: 'User information not available to record yet',
      notes
    });

    expect(error).toBeNull();
    expect(databaseNoneSpy).toHaveBeenCalledWith(expect.anything(), {
      clientGeneratedId: expect.stringMatching(clientGeneratedId),
      userRecorded: 'User information not available to record yet',
      notes: expect.stringMatching(notes)
    });
  });

  test('returns an application not found response for non existent application', async () => {
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
          one: throwingOneDatabaseSpy
        };
      }
    };

    const addCommentResponse = await addApplicationComment(container)({
      clientGeneratedId: 'does-not-exist-client-gen-id',
      notes: 'does-not-matter'
    });

    expect(addCommentResponse.error).toEqual(APPLICATION_NOT_FOUND);
  });

  test('returns a notes must not be empty response for empty notes', async () => {
    const { container } = createContainerAndDatabaseSpy();

    const addCommentResponse = await addApplicationComment(container)({
      clientGeneratedId: 'does-not-exist-client-gen-id',
      notes: ''
    });

    expect(addCommentResponse.error).toEqual(NOTES_MUST_NOT_BE_EMPTY);
  });

  test('returns a notes must not be empty response for notes not in body', async () => {
    const { container } = createContainerAndDatabaseSpy();

    const addCommentResponse = await addApplicationComment(container)({
      clientGeneratedId: 'does-not-exist-client-gen-id'
    });

    expect(addCommentResponse.error).toEqual(NOTES_MUST_NOT_BE_EMPTY);
  });
});
