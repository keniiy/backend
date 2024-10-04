import { IUserDocument } from '../../../dal/models/user.model';

declare global {
  namespace Express {
    interface Request {
      user?: IUserDocument;
    }
  }
}
