import { Request, Response } from 'express';
import { AdminService } from './admin.service';

export class AdminController {
  private adminService: AdminService = new AdminService();

  public getClients = async (_req: Request, res: Response): Promise<void> => {
    res.json(await this.adminService.getClients());
  };

  public updateClient = async (req: Request, res: Response): Promise<void> => {
    res.json(await this.adminService.updateClient(req.params.id, req.body));
  };

  public deleteClient = async (req: Request, res: Response): Promise<void> => {
    res.json(await this.adminService.deleteClient(req.params.id));
  };
}
