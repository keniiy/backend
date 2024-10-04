import { Request, Response, NextFunction } from 'express';
import { IStandardResponse } from '../interfaces/response.interface';

export function adminMiddleware(
  req: Request,
  res: Response<IStandardResponse<null>>,
  next: NextFunction,
): Response | void {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({
      statusCode: 403,
      success: false,
      data: null,
      message: 'Forbidden',
    });
  }
}
