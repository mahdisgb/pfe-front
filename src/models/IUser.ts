import { IRole } from './IRole';

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    hashedPassword?: string;
    roles?: IRole[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUserCreate {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface IUserUpdate extends Partial<IUserCreate> {
    id: number;
} 