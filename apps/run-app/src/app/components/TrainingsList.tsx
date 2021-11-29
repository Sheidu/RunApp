import { Button } from "@mui/material";
import { useCallback, useState } from "react";
import { AlertBar } from "./AlertBar";
import { Filter } from "./Filter";
import { TrainingDialog } from './TrainingDialog';
import { TrainingsTable } from "./TrainingsTable";
import { Box } from "@mui/system";
import { CreateEmptyTraining, Training, EnmTrainingTypes } from "../models/Training";
import { createTraining, getAllTrainings, updateTraining, removeTraining } from '../services/TrainingsService';
import { useQueryClient, useMutation, useQuery,  } from "react-query";
import { UpdateTrainingMutationVariables } from "../models/types";

export function TrainingsList() {
    const queryClient = useQueryClient();

    const [alertMeta, setAlertMeta] = useState({severity: '', message: ''});
    const [isAlertOpen, setAlertOpen] = useState(false);
    const showAlert = useCallback((severity: string, message: string) => {
          queryClient.invalidateQueries('trainings');
          setAlertMeta({severity, message});
          setAlertOpen(true);
      }
      , [queryClient]
    );
    const closeDialog = useCallback(() => {
          setOpenDlg(false);
          setSelectedTraining(CreateEmptyTraining());
      }
      , []
    );
    
    const handleAlertClose = useCallback((event?: React.SyntheticEvent | undefined, reason?: string | undefined) => {
          if (reason === 'clickaway') {
              return;
          }
          setAlertOpen(false);
      }
      , []
    );  
 
    // select all trainings
    const { data, isFetching } = useQuery<Training[]>('trainings', getAllTrainings);
    // add new training
    const addTraining = useMutation<Training, Error, Training>((newTraining) => createTraining(newTraining), {
      onSuccess: data => {
        showAlert("success", "Create succeeded.");
        closeDialog();
      },
      onError: () => {
        showAlert("error", "Create failed");
      }
    });
    // edit training
    const { mutate: mUpdateTraining } = useMutation<Training, Error, UpdateTrainingMutationVariables>((params) => updateTraining(params.id, params.data), {
      onSuccess: data => {
        showAlert("success", "Update succeeded.");
        closeDialog();
      },
      onError: () => {
        showAlert("error", "Update failed");
      }
    });
    // delete training
    const { mutate: mRemoveTraining } = useMutation<Training, Error, number>((id) => removeTraining(id), {
      onSuccess: data => {
        showAlert("success", "Remove succeeded.");
      },
      onError: () => {
        showAlert("error", "Remove failed");
      }
    });

    const [openDlg, setOpenDlg] = useState(false);
    const onDlgTrainingAddOpen = useCallback(() => {
        setSelectedTraining(CreateEmptyTraining());
        setOpenDlg(true);
      }
      , []
    );
    const onDlgTrainingClose = useCallback(() => {
        closeDialog();
      }
      , [closeDialog]
    );
    const onDlgTrainingSave = (selectedTraining: Training) => {
      if (selectedTraining.id) {
        mUpdateTraining({id: selectedTraining.id, data: selectedTraining});
      } else {
        addTraining.mutate(selectedTraining);
      }
      setOpenDlg(false);
    };
      
    const [filterType, setFilterType] = useState<EnmTrainingTypes>(EnmTrainingTypes.UNKNOWN);
    const onFilterTypeChanged = useCallback((selectedValue: EnmTrainingTypes) => {
        setFilterType(selectedValue);
      }
      , []
    );
    const [selectedTraining, setSelectedTraining] = useState<Training>(CreateEmptyTraining());

    const onEditTraining = useCallback(
      (selectedTraining: Training) => {
        setSelectedTraining(selectedTraining);
        setOpenDlg(true);
      }, 
      []
    );

    const onDeleteTraining = useCallback((selectedTraining: Training) => {
        mRemoveTraining(selectedTraining.id);
      }
      , [mRemoveTraining]
    );

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
            {isFetching && "Loading..."}
            {!isFetching && data &&
              <TrainingsTable filter={filterType} trainings={data} onEdit={onEditTraining} onDelete={onDeleteTraining} />
            }
        </Box>
    );
}