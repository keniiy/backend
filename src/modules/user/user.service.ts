import { IStandardResponse } from '../../common/interfaces/response.interface';
import { IUserDocument, IUser } from '../../dal/models/user.model';

export class UserService {
  public async getProfile(
    user: IUserDocument,
  ): Promise<IStandardResponse<Omit<IUser, 'password'>>> {
    const { password, ...userData } = user.toObject();
    return {
      statusCode: 200,
      success: true,
      data: userData,
      message: 'Profile retrieved successfully',
    };
  }
}
