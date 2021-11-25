import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { AlertBar } from "./AlertBar";
import { Filter } from "./Filter";
import { TrainingDialog } from './TrainingDialog';
import { TrainingsTable } from "./TrainingsTable";
import { Box } from "@mui/system";
import { CreateEmptyTraining, Training, EnmTrainingTypes } from "../models/Training";
import { createTraining, getAllTrainings, updateTraining, removeTraining } from '../services/TrainingsService';

export function TrainingsList() {
    const [alertMeta, setAlertMeta] = useState({severity: '', message: ''});
    const [isAlertOpen, setAlertOpen] = useState(false);
    const showAlert = (severity: string, message: string) => {
        setIsTrainingsListManipulated(true);
        setAlertMeta({severity, message});
        setAlertOpen(true);
    };
    const closeDialog = () => {
        setOpenDlg(false);
        setSelectedTraining(CreateEmptyTraining());
    };
    
    const handleAlertClose = (event?: React.SyntheticEvent | undefined, reason?: string | undefined) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertOpen(false);
    };  
 
    const [isTrainingsListManipulated, setIsTrainingsListManipulated] = useState(false);

    // const { data, isLoading } = useQuery<Training[]>('trainings', getAllTrainings);
    // const { mutate } = useMutation(updateTraining);
  
    const [trainings, setTrainings] = useState<Training[]>([]);
  
    useEffect(() => {
      getAllTrainings().then(res => setTrainings(res.data));
    }, []);
    useEffect(() => {
      if (isTrainingsListManipulated) {
        getAllTrainings().then(res => setTrainings(res.data));
      }
      setIsTrainingsListManipulated(false);
    }, [isTrainingsListManipulated]);
    
    const [openDlg, setOpenDlg] = useState(false);
    const onDlgTrainingAddOpen = () => {
      setSelectedTraining(CreateEmptyTraining());
      setOpenDlg(true);
    };
    const onDlgTrainingClose = () => {
      closeDialog();
    };
    const onDlgTrainingSave = (selectedTraining: Training) => {
      if (selectedTraining.id) {
        updateTraining(selectedTraining.id, selectedTraining)
        .then(() => {
          showAlert("success", "Update succeeded.");
          closeDialog();
        })
        .catch(() => showAlert("error", "Update failed"));
        //mutate(selectedTraining);
      } else {
        createTraining(selectedTraining)
        .then(() => {
          showAlert("success", "Create succeeded.");
          closeDialog();
        })
        .catch(() => showAlert("error", "Create failed"));
      }
      setOpenDlg(false);
    };
      
    const [filterType, setFilterType] = useState<EnmTrainingTypes>(EnmTrainingTypes.UNKNOWN);
    const onFilterTypeChanged = (selectedValue: EnmTrainingTypes) => {
      setFilterType(selectedValue);
    };
    const [selectedTraining, setSelectedTraining] = useState<Training>(CreateEmptyTraining());
    const onEditTraining = (selectedTraining: Training) => {
      setSelectedTraining(selectedTraining);
      setOpenDlg(true);
    };
    const onDeleteTraining = (selectedTraining: Training) => {
      removeTraining(selectedTraining.id)
      .then(() => {
        showAlert("success", "Remove succeeded.");
        closeDialog();
      })
      .catch(() => showAlert("error", "Remove failed"));
  
      setSelectedTraining(CreateEmptyTraining());
    };

    return (
        <Box>
            <Box >
                <AlertBar open={isAlertOpen} onClose={handleAlertClose} alertMeta={alertMeta}/>
                <TrainingDialog open={openDlg} 
                        onSave={onDlgTrainingSave} 
                        onClose={onDlgTrainingClose} 
                        selectedTraining={selectedTraining} />
            </Box>
            <Box display="grid" gridTemplateColumns="auto 100px" gap={3}>
                <Filter onFilterChange={onFilterTypeChanged}/>
                <Button variant="contained" onClick={onDlgTrainingAddOpen}>Add</Button>
            </Box>
            <TrainingsTable filter={filterType} trainings={trainings} onEdit={onEditTraining} onDelete={onDeleteTraining} />
        </Box>
    );
}