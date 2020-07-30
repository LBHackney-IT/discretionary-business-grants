import patchApplications from './patchApplications';

function createContainerAndDatabaseSpy(
  numberOfApplicationsInResponse,
  validationsJSONString = {
    businessBankAccount: { accountNumber: true, accountSortcode: true }
  }
) {
  const databaseSpy = jest.fn(() => {
    const databaseResponse = [];
    for (let count = 1; count <= numberOfApplicationsInResponse; count++) {
      databaseResponse.push({
        record_type: 'D',
        unique_payment_reference: count,
        account_holder: `accountholder${count}`,
        contact_address_first_line: `addrline1${count}`,
        contact_address_second_line: `addrline2${count}`,
        contact_address_third_line: `addrline3${count}`,
        contact_address_fourth_line: '',
        contact_address_postcode: `Post Code${count}`,
        amount_to_pay: `AmountToPay${count}`,
        payment_type: 'B',
        account_sortcode: `sort code${count}`,
        account_number: `account number${count}`,
        client_generated_id: `ClientGeneratedId${count}`,
        validations: JSON.stringify(validationsJSONString)
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

    expect(csvString).toEqual(expect.stringContaining(',1,'));
    expect(csvString).toEqual(expect.stringContaining(',sort code1,'));
    expect(csvString).toEqual(expect.stringContaining(',ClientGeneratedId1'));
    expect(csvString).toEqual(expect.stringContaining(',10,'));
    expect(csvString).toEqual(expect.stringContaining(',sort code10,'));
    expect(csvString).toEqual(expect.stringContaining(',ClientGeneratedId10'));
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

    const headerPattern = RegExp(/^H,NRGRT,Hackney,\d{2}.\d{2}.\d{4},1,0\n/);
    expect(headerPattern.test(csvString)).toBe(true);
  });

  test('returns a CSV with just the header row when 0 exports made', async () => {
    const { container } = createContainerAndDatabaseSpy(0);

    const { csvString } = await patchApplications(container)({ author: 'foo' });

    const wholeReportPattern = RegExp(
      /^H,NRGRT,Hackney,\d{2}.\d{2}.\d{4},0,0\n$/
    );
    expect(wholeReportPattern.test(csvString)).toBe(true);
  });

  test('bank account number is included if validated', async () => {
    const { container } = createContainerAndDatabaseSpy(1, {
      businessBankAccount: { accountNumber: true }
    });

    const { csvString } = await patchApplications(container)({ author: 'foo' });

    expect(csvString).toEqual(expect.stringContaining(',account number1,'));
  });

  test('bank account number is blank if notvalidated', async () => {
    const { container } = createContainerAndDatabaseSpy(1, {
      businessBankAccount: { accountNumber: false }
    });

    const { csvString } = await patchApplications(container)({ author: 'foo' });

    expect(csvString).toEqual(expect.not.stringContaining(',account number1,'));
  });

  test('bank sort code is included if validated', async () => {
    const { container } = createContainerAndDatabaseSpy(1, {
      businessBankAccount: { accountSortcode: true }
    });

    const { csvString } = await patchApplications(container)({ author: 'foo' });

    expect(csvString).toEqual(expect.stringContaining(',sort code1,'));
  });

  test('bank sort code is blank if not validated', async () => {
    const { container } = createContainerAndDatabaseSpy(1, {
      businessBankAccount: { accountSortcode: false }
    });

    const { csvString } = await patchApplications(container)({ author: 'foo' });

    expect(csvString).toEqual(expect.not.stringContaining(',sort code1,'));
  });
});
