import { Button,
    TextField,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputLabel,
    CircularProgress
} from "@mui/material";
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { TrainingTypesDropdown } from "./TrainingTypesDropdown";
import { Controller, useForm } from "react-hook-form";
import { EnmTrainingTypes, Training } from "../models/Training";
import { useEffect, useState } from "react";
import { DATE_FORMAT } from "../utils/constants";

interface TrainingDialogProps {
    selectedTraining: Training;
    open: boolean;
    onSave: (selectedTraining: Training) => void;
    onClose: () => void;
}

export function TrainingDialog(props: TrainingDialogProps) {
    const {handleSubmit, control, reset, formState: { errors }} = useForm<Training>();

    const onSubmit = (data : Training) => {
        props.onSave(data);
    };

    const [training, setTraining] = useState<Training | undefined>();
    useEffect(() => {
        setTraining(props.selectedTraining);
    }, [props.selectedTraining]);
    useEffect(() => {
        // reset form with user data
        reset(training);
    }, [reset, training]);

    return (

        <Dialog
            aria-labelledby="dlgTraining"
            open={props.open}
            onClose={props.onClose}
            fullWidth={true}
            maxWidth={"md"}
          >
            <DialogTitle id="dlgTraining">
                {training && (
                    (training.id > 0) ? (
                        "Edit Training - " + training.id.toString()
                    ) : (
                        "Add Training"
                    )
                )}
                {!training && "Training is loading"}
            </DialogTitle>
            <DialogContent>
                {training &&
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box display="grid" gridTemplateColumns="150px 1fr" gap={3}>
                        <InputLabel id="lblDistance">Distance (km):</InputLabel>
                        <Controller defaultValue={props.selectedTraining.distance}
                                        name={"distance"}
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <TextField variant="outlined" onChange={(e) => onChange(Number(e.target.value))} 
                                                value={value} />
                                        )}
                                    />
                        {errors.distance && <p>{errors.distance.message}</p>}
                    </Box>                
                    <Box display="grid" gridTemplateColumns="150px 1fr" gap={3}>
                        <InputLabel id="lblFilter">Date:</InputLabel>
                        <LocalizationProvider dateAdapter={DateAdapter}>
                            <Controller name={'date'} control={control} defaultValue={props.selectedTraining.date}
                                    render={({ field : {onChange , value } }) => (
                                <DesktopDatePicker 
                                    value={value} inputFormat={DATE_FORMAT}
                                    onChange={onChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                                    )}
                            />
                        </LocalizationProvider>
                        {errors.date && <p>{errors.date.message}</p>}
                    </Box>                
                    <Box display="grid" gridTemplateColumns="150px 1fr" gap={3}>                
                        <InputLabel id="lblType">Type:</InputLabel>
                        <Controller control={control} name={"type"} defaultValue={props.selectedTraining.type}
                            render={({ field: { onChange, value } }) => (
                                <TrainingTypesDropdown selectedType={value} 
                                    onChange={(selectedType) => onChange(selectedType)} />
                            )}
                         />
                    </Box>                
                    <Box display="grid" gridTemplateColumns="150px 1fr" gap={3}>
                        <InputLabel id="lblComment">Comment:</InputLabel>
                        <Controller defaultValue={props.selectedTraining.comment}
                                        name={"comment"}
                                        control={control}
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
                {!training && <CircularProgress />}    
            </DialogContent>
          </Dialog>        
    );
};