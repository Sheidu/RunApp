import { EnmTrainingTypes } from "./types";

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