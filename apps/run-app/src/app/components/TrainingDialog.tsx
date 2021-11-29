import { Button,
    TextField,
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    InputLabel,
    CircularProgress
} from "@mui/material";
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { TrainingTypesDropdown } from "./TrainingTypesDropdown";
import { Controller, useForm } from "react-hook-form";
import { Training } from "../models/Training";
import { useEffect, useMemo, useState } from "react";
import { DATE_FORMAT } from "../utils/constants";

interface TrainingDialogProps {
    selectedTraining: Training;
    open: boolean;
    onSave: (selectedTraining: Training) => void;
    onClose: () => void;
}

export function TrainingDialog(props: TrainingDialogProps) {
    const {handleSubmit, control, reset } = useForm<Training>({
        defaultValues: props.selectedTraining
    });

    const onSubmit = (data : Training) => {
        props.onSave(data);
    };

    useEffect(() => {
        reset(props.selectedTraining);
    }, [props.selectedTraining]);

    return (

        <Dialog
            aria-labelledby="dlgTraining"
            open={props.open}
            onClose={props.onClose}
            fullWidth={true}
            maxWidth={"md"}
          >
            <DialogTitle id="dlgTraining">
                {props.selectedTraining && (
                    (props.selectedTraining.id > 0) ? (
                        "Edit Training - " + props.selectedTraining.id.toString()
                    ) : (
                        "Add Training"
                    )
                )}
                {!props.selectedTraining && "Training is loading"}
            </DialogTitle>
            <DialogContent>
                {props.selectedTraining &&
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box display="grid" gridTemplateColumns="150px 1fr" gap={3}>
                        <InputLabel id="lblDistance">Distance (km):</InputLabel>
                        <Controller name={"distance"} control={control}
                                    rules={ {required: 'Please enter distance.'} }
                                        render={({ 
                                            field: { onChange, value },
                                            fieldState
                                        }) => (
                                            <TextField variant="outlined" onChange={(e) => onChange(Number(e.target.value))} 
                                                error={!!fieldState.error} helperText={fieldState.error?.message}
                                                value={value} />
                                        )}
                                    />
                    </Box>                
                    <Box display="grid" gridTemplateColumns="150px 1fr" gap={3}>
                        <InputLabel id="lblFilter">Date:</InputLabel>
                            <Controller name={'date'} control={control}
                                    rules={ {required: 'Please enter date.'} }
                                    render={({ 
                                        field : {onChange , value },
                                        fieldState
                                    }) => (
                                <DesktopDatePicker 
                                    value={value} inputFormat={DATE_FORMAT}
                                    onChange={onChange}
                                    renderInput={(params) => 
                                        <TextField {...params} error={!!fieldState.error} helperText={fieldState.error?.message}/>
                                    }
                                />
                                    )}
                            />
                    </Box>                
                    <Box display="grid" gridTemplateColumns="150px 1fr" gap={3}>                
                        <InputLabel id="lblType">Type:</InputLabel>
                        <Controller control={control} name={"type"} 
                            render={({ field: { onChange, value } }) => (
                                <TrainingTypesDropdown selectedType={value} 
                                    onChange={(selectedType) => onChange(Number(selectedType))} />
                            )}
                         />
                    </Box>                
                    <Box display="grid" gridTemplateColumns="150px 1fr" gap={3}>
                        <InputLabel id="lblComment">Comment:</InputLabel>
                        <Controller name={"comment"} control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <TextField variant="outlined" onChange={onChange} 
                                                multiline rows={2} maxRows={4}
                                                value={value} />
                                        )}
                                    />
                    </Box>                
                    <Box display="grid" gridTemplateColumns="auto auto" gap={3}>
                        <Button variant='outlined' onClick={props.onClose}>Cancel</Button>
                        <Button type="submit" variant='outlined'>Save</Button>
                    </Box>                
                </form>
                }        
                {!props.selectedTraining && <CircularProgress />}    
            </DialogContent>
          </Dialog>        
    );
};