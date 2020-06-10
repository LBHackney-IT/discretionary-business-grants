import {NotifyClient} from 'notifications-node-client';

export default (() => {
    let instance;
    return {
      getInstance: async () => {
        if (!instance) {
          instance = new NotifyClient(process.env.GOV_NOTIFY_API_KEY);
        } 
        return instance;
      }
    };
  })();