/**
 * Wraps a use-case with request/response logging.
 * @param {IUseCase} usecase the use case to execute
 * @param {ILogger} logger the logger to use
 */
export function withLogging(usecase, logger) {
  const usecaseName = usecase.constructor.name;
  const defaultMetadata = { usecase: usecaseName };

  return {
    execute: async (...args) => {
      logger.info(`Executing`, {
        arguments: args,
        ...defaultMetadata
      });

      try {
        const result = await usecase.execute(...args);
        logger.info(`Success`, { result, ...defaultMetadata });
        return result;
      } catch (error) {
        logger.error(error.message, { error, ...defaultMetadata });
        throw error;
      }
    }
  };
}
