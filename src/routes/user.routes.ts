import { Router } from 'express';
import { authMiddleware } from '../common/middlewares/auth.middleware';
import { asyncHandler } from '../common/utils/async-handler.util';
import { UserController } from '../modules/user/user.controller';

const router: Router = Router();
const userController: UserController = new UserController();

router.get('/profile', authMiddleware, asyncHandler(userController.getProfile));

export default router;
