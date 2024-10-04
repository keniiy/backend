import { AuthService } from '../modules/auth/auth.service';
import { UserModel } from '../dal/models/user.model';
import mongoose from 'mongoose';

describe('AuthService', () => {
  const authService = new AuthService();

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/testdb', {
      useNewUrlParser: true,
    } as any);
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  describe('register', () => {
    it('should register a new client', async () => {
      const userData = {
        name: 'Test Client',
        email: 'client@example.com',
        password: 'password123',
        businessType: 'Retail',
        role: 
      };

      const response = await authService.register(userData);

      expect(response.statusCode).toBe(201);
      expect(response.message).toBe('Registration successful');

      const user = await UserModel.findOne({ email: userData.email });
      expect(user).not.toBeNull();
      expect(user?.role).toBe('client');
    });

    it('should not register an existing client', async () => {
      const userData = {
        name: 'Test Client',
        email: 'client@example.com',
        password: 'password123',
        businessType: 'Retail',
        role: 'client',
      };

      await expect(authService.register(userData)).rejects.toEqual({
        statusCode: 400,
        message: 'User already exists',
      });
    });
  });

  describe('login', () => {
    it('should login an existing client', async () => {
      const response = await authService.login(
        'client@example.com',
        'password123',
      );

      expect(response.statusCode).toBe(200);
      expect(response.message).toBe('Login successful');
      expect(response.data).toHaveProperty('token');
    });

    it('should not login with incorrect password', async () => {
      await expect(
        authService.login('client@example.com', 'wrongpassword'),
      ).rejects.toEqual({
        statusCode: 401,
        message: 'Invalid credentials',
      });
    });
  });
});
