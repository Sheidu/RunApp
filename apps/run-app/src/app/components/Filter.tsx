import { Box, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { EnmTrainingTypes } from "../models/Training";
import { TrainingTypesDropdown } from "./TrainingTypesDropdown";

interface FilterProps {
    onFilterChange: (type: EnmTrainingTypes) => void;
}

export function Filter(props: FilterProps) {
    const [filter, setFilter] = useState(EnmTrainingTypes.UNKNOWN);

    return (
        <Box display="grid" gridTemplateColumns="150px 200px" gap={3}>
            <InputLabel id="lblFilter">Filter:</InputLabel>
            <TrainingTypesDropdown selectedType={filter} 
                                    onChange={(selectedType) => {
                                        setFilter(selectedType);
                                        props.onFilterChange(selectedType);
                                    }} />
        </Box>
    );
}