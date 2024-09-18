import mongoose, { Document, Schema } from 'mongoose';
import { Role } from '../enums/role.enum';

export interface IUser extends Document {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: string,
    isActive: boolean,
    lastLogin: Date,
}

// Define schema
const userSchema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: Role.USER },
    isActive: { type: Boolean, required: true, default: true },
    lastLogin: { type: Date, required: false, default: new Date() }

}, { timestamps: true });

// Create model
export const User = mongoose.model<IUser>('users', userSchema);
