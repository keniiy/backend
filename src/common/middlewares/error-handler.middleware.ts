import { Request, Response, NextFunction } from 'express';
import { IStandardResponse } from '../interfaces/response.interface';

export function errorHandler(
  err: any,
  _req: Request,
  res: Response<IStandardResponse<null>>,
  _next: NextFunction,
): void {
  const statusCode: number = err.statusCode || 500;
  const message: string = err.message || 'Internal Server Error';

  const response: IStandardResponse<null> = {
    statusCode,
    success: false,
    data: null,
    message,
  };

  res.status(statusCode).json(response);
}
