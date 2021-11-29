import { EnmTrainingTypes, Training } from "./Training";

export const EnmTrainingTypesLabel = new Map<number, string>([
    [EnmTrainingTypes.UNKNOWN, 'Not specified'],
    [EnmTrainingTypes.WALKING, 'Walking'],
    [EnmTrainingTypes.RUNNING, 'Running'],
    [EnmTrainingTypes.SWIMMING, 'Swimming'],
    [EnmTrainingTypes.CYCLING, 'Cycling']
]);

export type Order = 'asc' | 'desc';

export interface HeadCell {
    id: keyof Training;
    label: string;
    isSortable: boolean;
}

export interface UpdateTrainingMutationVariables {
    id: number;
    data: Training;
}