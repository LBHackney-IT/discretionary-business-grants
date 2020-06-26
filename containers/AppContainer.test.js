import AppContainer from './AppContainer';

describe('AppContainer', () => {
  let container;

  beforeEach(() => {
    process.env.API_KEY = 'notify-api-key-meow';
    container = AppContainer.getInstance();
  });

  afterEach(() => {
    process.env.API_KEY = undefined;
  });

  it('provides a singleton', () => {
    const instance = AppContainer.getInstance();

    expect(instance).toBeDefined();

    const secondInstance = AppContainer.getInstance();

    expect(instance).toEqual(secondInstance);
  });

  it('returns addApplicationComment', () => {
    expect(container.getAddApplicationComment()).toBeDefined();
  });

  it('returns getDbInstance', async () => {
    expect(await container.getDbInstance()).toBeDefined();
  });

  it('returns listApplications', () => {
    expect(container.getListApplications()).toBeDefined();
  });

  it('returns listApplicationComments', () => {
    expect(container.getListApplicationComments()).toBeDefined();
  });

  it('returns listGrantOfficers', () => {
    expect(container.getListGrantOfficers()).toBeDefined();
  });

  it('returns updateApplication', () => {
    expect(container.getUpdateApplication()).toBeDefined();
  });

  it('returns listApplicationsCSV', () => {
    expect(container.getListApplicationsCSV()).toBeDefined();
  });

  it('returns patchApplications', () => {
    expect(container.getPatchApplications()).toBeDefined();
  });
});
