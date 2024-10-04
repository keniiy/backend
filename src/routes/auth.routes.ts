import { Router } from 'express';
import { validate } from '../common/middlewares/validation.middleware';
import { registerSchema, loginSchema } from '../validators/auth.validator';
import { asyncHandler } from '../common/utils/async-handler.util';
import { AuthController } from '../modules/auth/auth.controller';

const router: Router = Router();
const authController: AuthController = new AuthController();

router.post(
  '/register',
  validate(registerSchema),
  asyncHandler(authController.register),
);

router.post(
  '/login',
  validate(loginSchema),
  asyncHandler(authController.login),
);

export default router;
