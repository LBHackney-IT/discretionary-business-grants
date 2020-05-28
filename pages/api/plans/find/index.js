import { findPlans } from '../../../../lib/dependencies';
import { ArgumentError } from '../../../../lib/domain';
import { logger } from '../../../../lib/infrastructure/logging';

export const endpoint = ({ findPlans }) => async (req, res) => {
  try {
    const result = await findPlans.execute({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      systemIds: req.body.systemIds
    });
    logger.info(`Success`, { result });

    res.status(200).json(result);
  } catch (err) {
    logger.error(err.message, { err });
    if (err instanceof ArgumentError) {
      return res.status(400).json({ error: `could not find plans` });
    }

    res.status(500).json({
      error: `could not find plans with firstName=${req.body.firstName}, lastName=${req.body.lastName}`
    });
  }
};

export default endpoint({ findPlans });
