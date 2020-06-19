import Database from '../lib/gateways/db';
import listApplications from '../lib/usecases/listApplications';
import updateApplication from '../lib/usecases/updateApplication';

class AppContainer {
  getDbInstance = () => {
    return Database.getInstance();
  };

  getListApplications = () => {
    return listApplications(this);
  };

  getUpdateApplication = () => {
    return updateApplication(this);
  };
}

export default (() => {
  let instance;

  return {
    getInstance: () => {
      if (!instance) {
        instance = new AppContainer();
        delete instance.constructor;
      }
      return instance;
    }
  };
})();
