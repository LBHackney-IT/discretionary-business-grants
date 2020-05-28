import { withLogging } from '../../../../lib/infrastructure/logging';

describe('withLogging', () => {
  class ExampleUseCase {
    execute() {
      return expectedResponse;
    }
  }

  const logger = {
    info: jest.fn(),
    error: jest.fn()
  };

  const expectedResponse = { some: 'value' };

  it('executes the use case and passes through the result', async () => {
    const useCase = withLogging(new ExampleUseCase(), logger);
    const result = await useCase.execute();
    expect(result).toBe(expectedResponse);
  });

  it('logs the request and response from a use case', async () => {
    const expectedRequest = { my: 'request' };
    const useCase = withLogging(new ExampleUseCase(), logger);

    await useCase.execute(expectedRequest);

    expect(logger.info).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        usecase: 'ExampleUseCase',
        arguments: [expectedRequest]
      }),
    );

    expect(logger.info).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        usecase: 'ExampleUseCase',
        result: expectedResponse
      })
    );
  });

  it('logs any errors and then rethrows them', async () => {
    const expectedError = new Error('Failed, because it is a test');

    class FailingUseCase {
      execute() {
        throw expectedError;
      }
    }

    const useCase = withLogging(new FailingUseCase(), logger);
    await expect(useCase.execute()).rejects.toThrow(expectedError);

    expect(logger.error).toHaveBeenCalledWith(
      expectedError.message,
      expect.objectContaining({
        usecase: 'FailingUseCase',
        error: expectedError
      })
    );
  });
});
