import { UserModel } from '../../dal/models/user.model';

export async function createAdminUser(): Promise<void> {
  const adminEmail = process.env.ADMIN_EMAIL!;
  const adminPassword = process.env.ADMIN_PASSWORD!;

  const existingAdmin = await UserModel.findOne({
    email: adminEmail,
    role: 'admin',
  });
  if (!existingAdmin) {
    const adminUser = new UserModel({
      name: 'Admin',
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
    });
    await adminUser.save();
    console.log('Admin user created');
  } else {
    console.log('Admin user already exists');
  }
}
