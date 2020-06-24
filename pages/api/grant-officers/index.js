import * as HttpStatus from 'http-status-codes';
import { nanoid } from 'nanoid';
import AppContainer from '../../../containers/AppContainer';

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      try {
        const container = AppContainer.getInstance();
        const listGrantOfficers = container.getListGrantOfficers();
        res.statusCode = HttpStatus.OK;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(await listGrantOfficers()));
      } catch (error) {
        console.log('Grant officer list error:', error, 'request:', req);
        res.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        res.end(JSON.stringify('Unable to list grant officers'));
      }
      break;

    default:
      res.statusCode = HttpStatus.BAD_REQUEST;
      res.end(JSON.stringify('Invalid request method'));
  }
};
