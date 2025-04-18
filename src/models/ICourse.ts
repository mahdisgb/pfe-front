import { ICategory } from './ICategory';

export interface ICourse {
    id: number;
    title: string;
    content?: string;
    document?: string;
    trainingId?: number;
    description?: string;
    categoryId?: number;
    category?: ICategory;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ICourseCreate {
    title: string;
    content?: string;
    document?: string;
    trainingId?: number;
    description?: string;
    categoryId?: number;
}

export interface ICourseUpdate extends Partial<ICourseCreate> {
    id: number;
} 