import { getPlan } from 'lib/dependencies';
import { ArgumentError } from 'lib/domain';
import { logger } from '../../../lib/infrastructure/logging';

export const endpoint = ({ getPlan }) => async (req, res) => {
  const id = req.url.split('/')[3];

  try {
    const result = await getPlan.execute({ id });

    if (!result) {
      return res.status(404).end();
    }

    logger.info(`Success`, { result });
    return res.status(200).json(result);
  } catch (err) {
    logger.error(err.message, { err });

    if (err instanceof ArgumentError) {
      return res.status(400).json({ error: `could not get plan` });
    }

    res.status(500).json({ error: `could not get plan with id=${id}` });
  }
};

export default endpoint({ getPlan });
