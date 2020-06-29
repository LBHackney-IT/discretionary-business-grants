import listApplicationsCSV from './listApplicationsCSV';

function createContainerAndDatabaseSpy(numberOfApplicationsInResponse) {
  const databaseSpy = jest.fn(() => {
    const databaseResponse = [];
    for (let count = 1; count <= numberOfApplicationsInResponse; count++) {
      databaseResponse.push({
        client_generated_id: `ClientGeneratedId${count}`,
        status: `status${count}`,
        business_name: `business_name${count}`,
        business_size: `business_size${count}`,
        business_type: `business_typed${count}`,
        contact_first_name: `contact_first_name${count}`,
        contact_last_name: `contact_last_name${count}`,
        contact_email_address: `contact_email_address${count}`,
        contact_telephone_number:
          count % 2 === 0 ? `contact_telephone_number${count}` : null,
        business_premises_description: `business_premises_description${count}`,
        business_post_code: `business_post_code${count}`,
        bank_name: `bank_name${count}`,
        bank_account_holder_name: ` bank_account_holder_name${count}`,
        bank_sort_code: `bank_sort_code${count}`
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
    const { databaseSpy, container } = createContainerAndDatabaseSpy(10);

    const { csvString } = await listApplicationsCSV(container)();

    expect(databaseSpy).toHaveBeenCalledWith(expect.stringContaining('SELECT'));
    expect(csvString).toEqual(expect.stringContaining('ClientGeneratedId1,'));
    expect(csvString).toEqual(expect.stringContaining(',status1,'));
    expect(csvString).toEqual(expect.stringContaining(',bank_sort_code1'));

    expect(csvString).toEqual(expect.stringContaining('ClientGeneratedId10,'));
    expect(csvString).toEqual(expect.stringContaining(',status10,'));
    expect(csvString).toEqual(expect.stringContaining(',bank_sort_code10'));
  });

  test('column headers are included for null fields', async () => {
    const { container } = createContainerAndDatabaseSpy(1);

    const { csvString } = await listApplicationsCSV(container)();

    expect(csvString).toEqual(
      expect.stringContaining(',contact_telephone_number,')
    );

    expect(csvString).toEqual(
      expect.not.stringContaining(',contact_telephone_number1,')
    );
  });

  test('column headers are present', async () => {
    const { container } = createContainerAndDatabaseSpy(1);
    const expectedHeaderColumns = [
      'client_generated_id',
      'status',
      'business_name',
      'business_size',
      'business_type',
      'contact_first_name',
      'contact_last_name',
      'contact_email_address',
      'contact_telephone_number',
      'business_premises_description',
      'business_post_code',
      'bank_name',
      'bank_account_holder_name',
      'bank_account_number',
      'bank_sort_code'
    ];

    const { csvString } = await listApplicationsCSV(container)();
    const generatedHeaderColumns = csvString
      .split('\n')
      .shift()
      .split(',');

    expect(generatedHeaderColumns).toEqual(
      expect.arrayContaining(expectedHeaderColumns)
    );
  });
});
