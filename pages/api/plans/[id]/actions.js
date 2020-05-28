import { addAction } from 'lib/dependencies';
import { logger } from 'lib/infrastructure/logging';

export const endpoint = ({ addAction }) => async (req, res) => {
  const { id } = req.query;

  try {
    const result = await addAction.execute({ planId: id, action: req.body });

    logger.info(`Success`, { result });
    return res.status(201).json(result);
  } catch (err) {
    logger.error(err.message, { err });
    return res.status(500).json({ error: 'Could not add an action' });
  }
};

export default endpoint({ addAction });
