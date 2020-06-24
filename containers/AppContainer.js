import Database from '../lib/gateways/db';
import listApplications from '../lib/usecases/listApplications';
import { updateApplication } from '../lib/usecases/updateApplication';
import listApplicationComments from '../lib/usecases/listApplicationComments';
import addApplicationComment from '../lib/usecases/addApplicationComment';

class AppContainer {
  getDbInstance = () => {
    return Database.getInstance();
  };

  getListApplications = () => {
    return listApplications(this);
  };

  getListApplicationComments = () => {
    return listApplicationComments(this);
  };

  getAddApplicationComment = () => {
    return addApplicationComment(this);
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
