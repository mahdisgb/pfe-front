export interface ICategory {
    id: number;
    name: string;
    description?: string;
    courseCount: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ICategoryCreate {
    name: string;
    description?: string;
}

export interface ICategoryUpdate extends Partial<ICategoryCreate> {
    id: number;
} 