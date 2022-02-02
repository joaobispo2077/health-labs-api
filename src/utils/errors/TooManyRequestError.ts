import { HttpError } from './HttpError';

export class TooManyRequestError extends HttpError {
  public name = 'TooManyRequestError';
  public statusCode = 429;

  constructor(message: string) {
    super(message);
  }
}
