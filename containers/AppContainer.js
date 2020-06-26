import Database from '../lib/gateways/db';
import { addApplicationComment } from '../lib/usecases/addApplicationComment';
import listApplications from '../lib/usecases/listApplications';
import listApplicationComments from '../lib/usecases/listApplicationComments';
import listApplicationsCSV from '../lib/usecases/listApplicationsCSV';
import { listGrantOfficers } from '../lib/usecases/listGrantOfficers';
import patchApplications from '../lib/usecases/patchApplications';
import { updateApplication } from '../lib/usecases/updateApplication';

class AppContainer {
  getDbInstance = () => {
    return Database.getInstance();
  };

  getAddApplicationComment = () => {
    return addApplicationComment(this);
  };

  getListApplicationComments = () => {
    return listApplicationComments(this);
  };

  getListApplications = () => {
    return listApplications(this);
  };

  getListGrantOfficers = () => {
    return listGrantOfficers(this);
  };

  getUpdateApplication = () => {
    return updateApplication(this);
  };

  getListApplicationsCSV = () => {
    return listApplicationsCSV(this);
  };

  getPatchApplications = () => {
    return patchApplications(this);
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
