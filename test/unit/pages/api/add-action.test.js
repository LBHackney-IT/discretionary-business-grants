import { endpoint } from 'pages/api/plans/[id]/actions';

describe('Add action API endpoint', () => {
  let res;
  let json;

  beforeEach(function() {
    json = jest.fn();
    res = {
      status: jest.fn(() => {
        return { json };
      })
    };
  });

  const req = {
    query: {
      id: '1'
    },
    body: {
      summary: 'test',
      description: 'test Description',
      dueDate: new Date()
    }
  };

  it('can add an action', async () => {
    const addAction = { execute: jest.fn() };
    await endpoint({ addAction })(req, res);

    expect(addAction.execute).toHaveBeenCalledWith({
      planId: '1',
      action: req.body
    });
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it('returns 500 if there is an error adding the action', async () => {
    const addAction = {
      execute: jest.fn(() => {
        throw new Error('error');
      })
    };
    await endpoint({ addAction })(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});
