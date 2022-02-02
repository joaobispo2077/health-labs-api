import { HttpError } from './HttpError';

export class NotFoundError extends HttpError {
  public name = 'NotFoundError';
  public statusCode = 404;

  constructor(message: string) {
    super(message);
  }
}
