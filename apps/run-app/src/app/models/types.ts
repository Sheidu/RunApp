import { Training } from "./Training";

export enum EnmTrainingTypes {
    UNKNOWN = 0,
    WALKING = 1,
    RUNNING = 2,
    SWIMMING = 3,
    CYCLING = 4
}
export const EnmTrainingTypesLabel = new Map<number, string>([
    [EnmTrainingTypes.UNKNOWN, 'Not specified'],
    [EnmTrainingTypes.WALKING, 'Walking'],
    [EnmTrainingTypes.RUNNING, 'Running'],
    [EnmTrainingTypes.SWIMMING, 'Swimming'],
    [EnmTrainingTypes.CYCLING, 'Cycling']
]);

export interface TrainingDialogProps {
    selectedTraining: Training;
    open: boolean;
    onSave: (selectedTraining: Training) => void;
    onClose: () => void;
}

export interface TrainingDialogState {
    open: boolean;
    distance: number | null;
    date: Date | string | null;
    type: EnmTrainingTypes;
    comment: string
}

export interface TrainingTypesProps {
    name: any;
    control: any;
    label: any;
    selectedType: EnmTrainingTypes;
}

export interface TrainingsTableProps {
    filter: EnmTrainingTypes;
    trainings: Training[];
    onEdit: (selectedTraining: Training) => void;
    onDelete: (selectedTraining: Training) => void;
}
 
export interface TrainingsTableState {
    order: Order,
    orderBy: keyof Training
}

export type Order = 'asc' | 'desc';

export interface HeadCell {
    id: keyof Training;
    label: string;
    isSortable: boolean;
}

export interface SortableTableHeaderProps {
    order: Order;
    orderBy: string;
    onHeaderClick: (event: React.MouseEvent<unknown>, property: keyof Training) => void;
}

export interface AlertBarProps {
    alertMeta: {severity: string, message: string};
    open: boolean; 
    onClose: (event?: React.SyntheticEvent | undefined, reason?: string | undefined) => void;
}