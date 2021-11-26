import { Button, TableCell, TableRow } from "@mui/material";
import { Training } from "../models/Training";
import { EnmTrainingTypesLabel } from "../models/types";

interface TrainingsTableRowProps {
    dataModel: Training;
    onEdit: (selectedTraining: Training) => void;
    onDelete: (selectedTraining: Training) => void;
}

export function TrainingsTableRow(props: TrainingsTableRowProps) {
    return (
        <TableRow>
            <TableCell>{new Date(props.dataModel.date).toLocaleDateString()}</TableCell>
            <TableCell>{EnmTrainingTypesLabel.get(props.dataModel.type)}</TableCell>
            <TableCell>{props.dataModel.distance}</TableCell>
            <TableCell><Button variant="outlined" onClick={() => props.onEdit(props.dataModel)}>Edit</Button></TableCell>
            <TableCell><Button variant="outlined" onClick={() => props.onDelete(props.dataModel)}>X</Button></TableCell>
      </TableRow>
    );
}