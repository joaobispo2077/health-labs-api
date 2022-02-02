import { HttpError } from './HttpError';

export class UnprocessableEntityError extends HttpError {
  public name = 'UnprocessableEntityError';
  public statusCode = 422;

  constructor(message: string) {
    super(message);
  }
}
