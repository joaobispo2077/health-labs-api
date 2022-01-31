export class HttpError extends Error {
  public status: number;

  constructor(message: string, status = 500) {
    super(message);
    this.status = status;
  }
}
