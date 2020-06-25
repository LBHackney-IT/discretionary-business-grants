import { listGrantOfficers } from './listGrantOfficers';

function createContainerAndDatabaseSpy(numberOfGrantOfficersInResponse) {
  const databaseSpy = jest.fn(() => {
    const databaseResponse = [];
    for (let count = 1; count <= numberOfGrantOfficersInResponse; count++) {
      databaseResponse.push({
        user_recorded: `User Name ${count} <user.name.${count}@domain.tld>`
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

describe('listGrantOfficers', () => {
  test('returns a JSON object containing known grant officers', async () => {
    const { container } = createContainerAndDatabaseSpy(10);

    const { grantOfficers } = await listGrantOfficers(container)({
      currentPage: 1,
      pageSize: 10
    });

    expect(grantOfficers).toHaveLength(10);
    expect(grantOfficers[0]).toEqual({
      identifier: 'User Name 1 <user.name.1@domain.tld>'
    });
    expect(grantOfficers[9]).toEqual({
      identifier: 'User Name 10 <user.name.10@domain.tld>'
    });
  });
});
