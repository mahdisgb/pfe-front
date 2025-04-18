import { IUser } from './IUser';

export interface IRole {
    id: number;
    name: string;
    users?: IUser[];
}

export interface IRoleCreate {
    name: string;
}

export interface IRoleUpdate extends Partial<IRoleCreate> {
    id: number;
} 