import { NextFunction, Request, Response } from 'express';
import { HTTPError } from '../errors';

declare global {
  namespace Express {
    interface Request {
      validatedData?: Record<string, any>;
    }
  }
}

export function notFound() {
  throw new HTTPError({ message: 'Not found', status: 404 });
}

export function errorHandler(
  error: HTTPError | Error,
  _: Request,
  res: Response,
  __: NextFunction
) {
  let status = 500;
  const message = error.message || 'Algo salió mal';

  if (error instanceof HTTPError) {
    status = error.status;
  }

  res.status(status).json({ error: message });
}
