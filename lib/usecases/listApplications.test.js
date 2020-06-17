import listApplications from './listApplications';

describe('listApplications', () => {
  test('returns a JSON object containing the applications', async () => {
    const databaseSpy = jest.fn(() => {
      const databaseResponse = [];
      for (let count = 1; count <= 25; count++) {
        databaseResponse.push({
          date_time_recorded: '2020-06-16T06:16:19.640Z',
          client_generated_id: `ClientGeneratedId${count}`,
          business_name: `Business Name ${count}`,
          status: 'Unprocessed'
        });
      }
      return databaseResponse;
    });

    const getDb = async () => {
      return {
        any: databaseSpy
      };
    };

    const applicationsResponse = await listApplications({
      page: 1,
      pageSize: 10
    });
    console.log(applicationsResponse);
    const applications = applicationsResponse.applications;
    const error = applicationsResponse.error;

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(expect.anything(), [1, "scheduled"]);
    expect(applications).toHaveLength(10);
    // expect(scheduledCalls[0]).toEqual({
    //   id: 1,
    //   patientName: "Bob",
    //   callTime: "2020-04-15T23:00:00.000Z",
    //   recipientNumber: "07700900900",
    //   recipientEmail: "billy@bob.com",
    //   recipientName: "Billy",
    //   callId: "cb238rfv23cuv3",
    //   provider: "whereby",
    // });
    // expect(scheduledCalls[1]).toEqual({
    //   id: 2,
    //   patientName: "Harry",
    //   callTime: "2020-04-15T23:00:00.000Z",
    //   recipientNumber: "07700900900",
    //   recipientEmail: "bob@bob.com",
    //   recipientName: "Bob",
    //   callId: "cb238rfv23cuv3",
    //   provider: "jitsi",
    // });
  });
});
