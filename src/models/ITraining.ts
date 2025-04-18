export interface ITraining {
    id: number;
    title: string;
    description?: string;
    type?: string;
    category?: string;
    price?: number;
    professorId?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ITrainingCreate {
    title: string;
    description?: string;
    type?: string;
    category?: string;
    price?: number;
    professorId?: number;
}

export interface ITrainingUpdate extends Partial<ITrainingCreate> {
    id: number;
} 