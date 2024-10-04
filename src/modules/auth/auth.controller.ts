import { Request, Response } from 'express';
import { AuthService } from './auth.service';

export class AuthController {
  private authService: AuthService = new AuthService();

  public register = async (req: Request, res: Response): Promise<void> => {
    res.json(await this.authService.register(req.body));
  };

  public login = async (req: Request, res: Response): Promise<void> => {
    res.json(await this.authService.login(req.body.email, req.body.password));
  };
}
