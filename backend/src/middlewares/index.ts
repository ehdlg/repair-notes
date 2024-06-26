import { NextFunction, Request, Response } from 'express';
import { HTTPError } from '../errors';

export function notFound() {
  throw new HTTPError({ message: 'Not found', status: 404 });
}

export function errorHandler(
  error: HTTPError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction // eslint-disable-line @typescript-eslint/no-unused-vars
) {
  let status = 500;
  const message = error.message || 'Algo salió mal';

  if (error instanceof HTTPError) {
    status = error.status;
  }

  res.status(status).json({ error: message });
}
