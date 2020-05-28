const log = (level, message, data = {}) =>
  console.log(
    JSON.stringify({
      level,
      timestamp: new Date(Date.now()).toISOString(),
      handler: process.env._HANDLER,
      message,
      data
    })
  );

const logger = {
  info: (message, data) => log('INFO', message, data),
  error: (message, data) => log('ERROR', message, data)
};

export default logger;
