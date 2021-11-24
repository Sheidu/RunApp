import { Button,
    TextField,
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputLabel
} from "@mui/material";
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { TrainingDialogProps } from "../models/types";
import TrainingTypesDropdown from "./TrainingTypesDropdown";
import { Controller, useForm } from "react-hook-form";
import { Training } from "../models/Training";
import { useEffect, useState } from "react";
import { DATE_FORMAT } from "../utils/constants";

const TrainingDialog = (props: TrainingDialogProps) => {
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
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Grid container xs={12}>
                        <Grid container xs={5}>
                            <InputLabel id="lblDistance">Distance (km):</InputLabel>
                        </Grid>
                        <Grid container xs={7}>
                            <Controller defaultValue={props.selectedTraining.distance}
                                name={"distance"}
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextField variant="outlined" onChange={onChange} 
                                        value={value} />
                                )}
                            />
                            {errors.distance && <p>{errors.distance.message}</p>}
                        </Grid>              
                    </Grid>
                    <Grid container xs={12}>
                        <Grid container xs={5}>
                            <InputLabel id="lblFilter">Date:</InputLabel>
                        </Grid>
                        <Grid container xs={7}>
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
                        </Grid>              
                    </Grid>
                    <Grid container xs={12}>
                        <Grid container xs={5}>
                            <InputLabel id="lblType">Type:</InputLabel>
                        </Grid>
                        <Grid container xs={7}>
                            <TrainingTypesDropdown name="type" label=''                           
                                control={control}
                                selectedType={props.selectedTraining.type} />
                        </Grid>              
                    </Grid>
                    <Grid container xs={12}>
                        <Grid container xs={5}>
                            <InputLabel id="lblComment">Comment:</InputLabel>
                        </Grid>
                        <Grid container xs={7}>
                            <Controller defaultValue={props.selectedTraining.comment}
                                name={"comment"}
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextField variant="outlined" onChange={onChange} 
                                        multiline rows={2} maxRows={4}
                                        value={value} />
                                )}
                            />
                        </Grid>              
                    </Grid>
                    <Grid container xs={12}>
                        <Button variant='outlined' onClick={props.onClose}>Cancel</Button>
                        <Button type="submit" variant='outlined'>Save</Button>
                    </Grid>
                </Grid>
              </Grid>
            </form>
            }        
            {!training &&
                <div className="text-center p-3">
                    <span className="spinner-border spinner-border-lg align-center"></span>
                </div>
            }    
            </DialogContent>
            <DialogActions>
            </DialogActions>
          </Dialog>        
    );
};

export default TrainingDialog;