export class HTTPError extends Error {
  readonly status;

  constructor({ message, status }: { message: string; status: number }) {
    super(message);
    this.status = status;
  }
}
