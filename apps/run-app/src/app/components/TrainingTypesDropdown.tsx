import { MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";
import { EnmTrainingTypes, EnmTrainingTypesLabel, TrainingTypesProps } from "../models/types";

export const TrainingTypesDropdown = (props: TrainingTypesProps) => {
        return (
            <Controller control={props.control} name={props.name} defaultValue={props.selectedType}
                render={({ field: { onChange, value } }) => (
                    <Select value={value} onChange={(e) => onChange(new Number(e.target.value))} variant="outlined">
                        {Object.keys(EnmTrainingTypes)
                            .filter(key => !isNaN(Number(key)))
                            .map(key => 
                                <MenuItem selected={props.selectedType === Number(key)} 
                                            value={key}>
                                    {EnmTrainingTypesLabel.get(Number(key))}
                                </MenuItem> 
                        )}
                    </Select>
                )}
            />
        );
}
 
export default TrainingTypesDropdown