import { MenuItem, Select } from "@mui/material";
import { EnmTrainingTypes } from "../models/Training";
import { EnmTrainingTypesLabel } from "../models/types";

interface TrainingTypesProps {
    selectedType: EnmTrainingTypes;
    onChange: (selectedValue: EnmTrainingTypes) => void;
}

export function TrainingTypesDropdown(props: TrainingTypesProps) {
        return (
                    <Select value={props.selectedType} onChange={(e) => props.onChange(e.target.value as EnmTrainingTypes)} variant="outlined">
                        {Object.keys(EnmTrainingTypes)
                            .filter(key => !isNaN(Number(key)))
                            .map(key => 
                                <MenuItem value={key}>
                                    {EnmTrainingTypesLabel.get(Number(key))}
                                </MenuItem> 
                        )}
                    </Select>
                );
}