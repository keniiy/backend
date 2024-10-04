import { Request, Response } from 'express';
import { UserService } from './user.service';

export class UserController {
  private userService: UserService = new UserService();

  public getProfile = async (req: Request, res: Response): Promise<void> => {
    res.json(await this.userService.getProfile(req.user!));
  };
}
