import patchApplications from './patchApplications';

function createContainerAndDatabaseSpy(numberOfApplicationsInResponse) {
  const databaseSpy = jest.fn(() => {
    const databaseResponse = [];
    for (let count = 1; count <= numberOfApplicationsInResponse; count++) {
      databaseResponse.push({
        record_type: 'D',
        client_generated_id: `ClientGeneratedId${count}`,
        account_holder: `accountholder${count}`,
        contact_address_first_line: `addrline1${count}`,
        contact_address_second_line: `addrline2${count}`,
        contact_address_third_line: `addrline3${count}`,
        contact_address_fourth_line: '',
        contact_address_postcode: `Post Code${count}`,
        amount_to_pay: 0,
        payment_type: 'B',
        account_sortcode: `sort code${count}`,
        account_number: `account number${count}`
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

describe('patchApplications', () => {
  test('returns a CSV object containing exported applications', async () => {
    const { databaseSpy, container } = createContainerAndDatabaseSpy(10);

    const { csvString } = await patchApplications(container)({ author: 'foo' });

    expect(databaseSpy).toHaveBeenCalledWith(
      expect.stringContaining('WITH exported AS'),
      {
        user: expect.anything()
      }
    );

    expect(csvString).toEqual(expect.stringContaining(',ClientGeneratedId1,'));
    expect(csvString).toEqual(expect.stringContaining(',sort code1,'));
    expect(csvString).toEqual(expect.stringContaining(',ClientGeneratedId10,'));
    expect(csvString).toEqual(expect.stringContaining(',sort code10,'));
  });

  test('inserts the author into the query for the notes', async () => {
    const { databaseSpy, container } = createContainerAndDatabaseSpy(1);

    await patchApplications(container)({ author: 'foo' });

    expect(databaseSpy).toHaveBeenCalledWith(expect.anything(), {
      user: expect.stringMatching('foo')
    });
  });

  test('returns a CSV with the header summary row', async () => {
    const { container } = createContainerAndDatabaseSpy(1);

    const { csvString } = await patchApplications(container)({ author: 'foo' });

    const headerPattern = RegExp(/^H,NRGRT,\d{2}.\d{2}.\d{4},1,0\n/);
    expect(headerPattern.test(csvString)).toBe(true);
  });

  test('returns a CSV with just the header row when 0 exports made', async () => {
    const { container } = createContainerAndDatabaseSpy(0);

    const { csvString } = await patchApplications(container)({ author: 'foo' });

    const wholeReportPattern = RegExp(/^H,NRGRT,\d{2}.\d{2}.\d{4},0,0\n$/);
    expect(wholeReportPattern.test(csvString)).toBe(true);
  });
});
