import { Request, Response, NextFunction } from 'express';
import { validationResult, matchedData, query } from 'express-validator';

export function validation(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const datosValidados = matchedData(req);
    req.validatedData = datosValidados;
    return next();
  }

  const errorsMessages = errors.array().map((error) => {
    return error.msg;
  });

  return res.status(422).json({ errors: errorsMessages });
}

export const getRules = (() => {
  return [
    query('limit')
      .optional()
      .isInt({ min: 1 })
      .withMessage('El límite debe ser un número mayor a 0'),

    query('offset')
      .optional()
      .isInt({ min: 0 })
      .withMessage('El offset debe ser un número mayor o igual a 0'),
  ];
})();
