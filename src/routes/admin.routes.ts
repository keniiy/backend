import { Router } from 'express';
import { authMiddleware } from '../common/middlewares/auth.middleware';
import { adminMiddleware } from '../common/middlewares/admin.middleware';
import { asyncHandler } from '../common/utils/async-handler.util';
import { AdminController } from '../modules/admin/admin.controller';

const router: Router = Router();
const adminController: AdminController = new AdminController();

router.get(
  '/clients',
  authMiddleware,
  adminMiddleware,
  asyncHandler(adminController.getClients),
);

router.put(
  '/clients/:id',
  authMiddleware,
  adminMiddleware,
  asyncHandler(adminController.updateClient),
);

router.delete(
  '/clients/:id',
  authMiddleware,
  adminMiddleware,
  asyncHandler(adminController.deleteClient),
);

export default router;
