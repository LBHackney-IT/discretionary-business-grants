import * as HttpStatus from 'http-status-codes';
import applicationDetails from '../../../../lib/usecases/applicationDetails';
import {
  updateApplication,
  ONE_PROPERTY_PERMITTED,
  INVALID_STATUS
} from '../../../../lib/usecases/updateApplication';
import {
  APPLICATION_NOT_FOUND,
  DISALLOWED_PROPERTY_IN_REQUEST,
  NO_ALLOWED_PROPERTIES_IN_REQUEST
} from '../../../../lib/constants';
import { getUserStringFromCookie } from '../../../../utils/auth';

export default async (req, res) => {
  const clientGeneratedId = req.query.clientGeneratedId;

  switch (req.method) {
    case 'GET':
      try {
        res.setHeader('Content-Type', 'application/json');
        let applicationDetailsResponse = await applicationDetails({
          clientGeneratedId
        });
        if (applicationDetailsResponse.error === APPLICATION_NOT_FOUND) {
          res.statusCode = HttpStatus.NOT_FOUND;
        } else {
          res.statusCode = HttpStatus.OK;
        }
        res.end(JSON.stringify(applicationDetailsResponse));
      } catch (error) {
        console.log('Application details error:', error, 'request:', req);
        res.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        res.end(JSON.stringify('Unable to get application details'));
      }
      break;

    case 'PATCH':
      try {
        res.setHeader('Content-Type', 'application/json');
        const updateApplicationResponse = await updateApplication({
          clientGeneratedId,
          data: req.body,
          user: getUserStringFromCookie(req.headers.cookie)
        });
        if (updateApplicationResponse.error === APPLICATION_NOT_FOUND) {
          res.statusCode = HttpStatus.NOT_FOUND;
        } else if (
          [
            INVALID_STATUS,
            DISALLOWED_PROPERTY_IN_REQUEST,
            NO_ALLOWED_PROPERTIES_IN_REQUEST,
            ONE_PROPERTY_PERMITTED
          ].includes(updateApplicationResponse.error)
        ) {
          res.statusCode = HttpStatus.BAD_REQUEST;
        } else {
          res.statusCode = HttpStatus.CREATED;
        }
        res.end(JSON.stringify(updateApplicationResponse));
      } catch (error) {
        console.log('Application patch error:', error, 'request:', req);
        res.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        res.end(JSON.stringify('Unable to patch application'));
      }
      break;

    default:
      res.statusCode = HttpStatus.BAD_REQUEST;
      res.end(JSON.stringify('Invalid request method'));
  }
};
