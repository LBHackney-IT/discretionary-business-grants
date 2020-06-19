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

  it('returns getDbInstance', async () => {
    expect(await container.getDbInstance()).toBeDefined();
  });

  it('returns listApplications', () => {
    expect(container.getListApplications()).toBeDefined();
  });

  it('returns updateApplication', () => {
    expect(container.getUpdateApplication()).toBeDefined();
  });
});
