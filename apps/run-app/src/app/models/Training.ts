export enum EnmTrainingTypes {
    UNKNOWN = 0,
    WALKING = 1,
    RUNNING = 2,
    SWIMMING = 3,
    CYCLING = 4
}

export interface Training {
    id: number;
    date: Date;
    distance: number;
    type: EnmTrainingTypes;
    comment: string;
}

export function CreateEmptyTraining(): Training {
    return {
        id: 0,
        date: new Date(),
        distance: 0,
        type: EnmTrainingTypes.UNKNOWN,
        comment: ''
    }
}

export function CreateTraining(
    id: number,
    date: Date,
    distance: number,
    type: EnmTrainingTypes,
    comment: string): Training {
    return {
        id,
        date,
        distance,
        type,
        comment
    }
}