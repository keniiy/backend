import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IStandardResponse } from '../interfaces/response.interface';
import { IUserDocument, UserModel } from '../../dal/models/user.model';

interface DecodedToken extends JwtPayload {
  id: string;
  role: string;
}

export async function authMiddleware(
  req: Request,
  res: Response<IStandardResponse<null>>,
  next: NextFunction,
): Promise<Response | void> {
  const authHeader: string | undefined = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({
      statusCode: 401,
      success: false,
      data: null,
      message: 'Unauthorized',
    });
  }

  const token: string = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      statusCode: 401,
      success: false,
      data: null,
      message: 'Unauthorized',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    const user: IUserDocument | null = await UserModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        statusCode: 401,
        success: false,
        data: null,
        message: 'Unauthorized',
      });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({
      statusCode: 401,
      success: false,
      data: null,
      message: 'Unauthorized',
    });
  }
}
