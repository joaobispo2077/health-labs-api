import { HttpError } from './HttpError';

export class UnprocessableEntity extends HttpError {
  public name = 'UnprocessableEntity';
  public statusCode = 422;

  constructor(message: string) {
    super(message);
  }
}
