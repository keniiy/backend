import jwt from 'jsonwebtoken';
import { IStandardResponse } from '../../common/interfaces/response.interface';
import { IUser, IUserDocument, UserModel } from '../../dal/models/user.model';

export class AuthService {
  public async register(
    userData: IUser,
  ): Promise<IStandardResponse<Omit<IUser, 'password'>>> {
    const existingUser: IUserDocument | null = await UserModel.findOne({
      email: userData.email,
    });
    if (existingUser) {
      throw { statusCode: 400, message: 'User already exists' };
    }

    const user = new UserModel(userData);
    await user.save();

  
    const { password, ...userWithoutPassword } = user.toObject();

    return {
      statusCode: 201,
      success: true,
      data: userWithoutPassword,
      message: 'Registration successful',
    };
  }
  public async login(
    email: string,
    password: string,
  ): Promise<IStandardResponse<{ token: string }>> {
    const user: IUserDocument | null = await UserModel.findOne({ email });
    if (!user) {
      throw { statusCode: 401, message: 'Invalid credentials' };
    }

    const isMatch: boolean = await user.comparePassword(password);
    if (!isMatch) {
      throw { statusCode: 401, message: 'Invalid credentials' };
    }

    const token: string = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' },
    );

    return {
      statusCode: 200,
      success: true,
      data: { token },
      message: 'Login successful',
    };
  }
}
