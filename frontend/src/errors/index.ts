export class FetchError extends Error {
  readonly info;
  readonly status;

  constructor(message: string, info: string[], status: number) {
    super(message);
    this.info = info;
    this.status = status;
  }
}
