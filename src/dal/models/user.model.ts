import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export type UserRole = 'client' | 'admin';

export interface IUser {
  name: string;
  email: string;
  password: string;
  businessType?: string;
  role: UserRole;
}

export interface IUserDocument extends IUser, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema<IUserDocument> = new Schema<IUserDocument>({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  businessType: { type: String },
  role: { type: String, enum: ['client', 'admin'], default: 'client' },
});

UserSchema.pre<IUserDocument>('save', async function (): Promise<void> {
  if (!this.isModified('password')) return;
  const salt: string = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = function (
  candidatePassword: string,
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const UserModel = model<IUserDocument>('User', UserSchema);
