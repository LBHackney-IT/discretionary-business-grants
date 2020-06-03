export default (() => {
  let instance;
  return {
    getInstance: async () => {
      if (!instance) {
        const { default: pgp } = await import('pg-promise');
        let options = {
          connectionString: process.env.DATABASE_URL
        };
        if (process.env.NODE_ENV === 'test') {
          options.connectionString = process.env.TEST_DATABASE_URL;
        }
        if (process.env.NODE_ENV === 'production') {
          delete options.connectionString;
          options.host = process.env.HOST;
          options.user = process.env.USERNAME;
          options.password = process.env.PASSWORD;
          options.database = process.env.DATABASE;
        }
        instance = pgp()(options);
        delete instance.constructor;
      }

      return instance;
    }
  };
})();
