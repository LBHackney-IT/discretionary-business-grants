import {NotifyClient} from 'notifications-node-client';

const notifyClient = new NotifyClient(process.env.GOV_NOTIFY_API_KEY);
export default notifyClient;
