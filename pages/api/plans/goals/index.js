import { addGoal } from '../../../../lib/dependencies';
import { ArgumentError } from '../../../../lib/domain';
import { logger } from '../../../../lib/infrastructure/logging';

export const endpoint = ({ addGoal }) => async (req, res) => {
  try {
    const result = await addGoal.execute({
      planId: req.body.planId,
      goal: req.body.goal
    });

    logger.info(`Success`, { result });
    res.status(200).json(result);
  } catch (err) {
    logger.error(err.message, { err });
    if (err instanceof ArgumentError) {
      return res.status(400).json({ error: `could not add goal to plan` });
    }

    console.log(req.body.planId);
    res.status(500).json({
      error: `could not add goal to plan with id=${req.body.planId}`
    });
  }
};

export default endpoint({ addGoal });
