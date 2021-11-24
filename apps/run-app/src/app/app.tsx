// components
import Button from '@mui/material/Button'

import InputLabel from '@mui/material/InputLabel'

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

// hooks
import { useEffect, useState } from 'react';

import { QueryClient, useQuery, useMutation, useQueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import TrainingDialog from './components/TrainingDialog';
import { CreateEmptyTraining, Training } from "./models/Training";
import TrainingsTable from './components/TrainingsTable';
import { EnmTrainingTypes, EnmTrainingTypesLabel } from './models/types';
import { getAllTrainings, createTraining, updateTraining, removeTraining } from './services/TrainingsService';
import { MenuItem, Select } from '@mui/material';
import {AlertBar} from "./components/AlertBar";

export function App() {
  const [alertMeta, setAlertMeta] = useState({severity: '', message: ''});
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [isTrainingsListManipulated, setisTrainingsListManipulated] = useState(false);
 
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
    setisTrainingsListManipulated(false);
  }, [isTrainingsListManipulated]);

  const showAlert = (severity: string, message: string) => {
    setisTrainingsListManipulated(true);
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
    <Box sx={{ flexGrow: 1, marginTop: 4 }}>
      <Container>
        <Grid container spacing={2}>
          <Grid container xs={12}>
            <AlertBar open={isAlertOpen} onClose={handleAlertClose} alertMeta={alertMeta}/>
            <TrainingDialog open={openDlg} 
                onSave={onDlgTrainingSave} 
                onClose={onDlgTrainingClose} 
                selectedTraining={selectedTraining} />
          </Grid>
          <Grid container xs={11}>
            <Grid container xs={1}>
              <InputLabel id="lblFilter">Filter:</InputLabel>
            </Grid>
             <Grid container xs={11}>
              <Select value={filterType} onChange={(e) => onFilterTypeChanged(e.target.value as EnmTrainingTypes)} variant="outlined">
                        {Object.keys(EnmTrainingTypes)
                            .filter(key => !isNaN(Number(key)))
                            .map(key => 
                                <MenuItem value={key}>
                                    {EnmTrainingTypesLabel.get(Number(key))}
                                </MenuItem> 
                        )}
              </Select>
            </Grid>
          </Grid>
          <Grid container xs={1}>
              <Button variant="contained" onClick={onDlgTrainingAddOpen}>Add</Button>
          </Grid>
          <Grid xs={12}>
              {trainings.length > 0 &&
                <TrainingsTable filter={filterType} trainings={trainings} onEdit={onEditTraining} onDelete={onDeleteTraining} />
              }
              {trainings.length === 0 && "No data"}
          </Grid>
        </Grid>
      </Container>
    </Box>      
  );
}

export default App;
