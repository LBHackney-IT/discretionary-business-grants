import uploadBusinessGrant from '../../../lib/usecases/uploadBusinessGrant';

export default async (req, res) => {
    try {
      let response = {};
      
      /*
      const x = await uploadBusinessGrant(req.body);
      */

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ response }));
    } catch (error) {
      res.statusCode = 500;
      res.end();
    }
  };