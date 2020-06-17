import Database from '../lib/gateways/db';
import listApplications from '../lib/usecases/listApplications';

class AppContainer {
  getDbInstance = () => {
    return Database.getInstance();
  };

  getListApplications = () => {
    return listApplications(this);
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
