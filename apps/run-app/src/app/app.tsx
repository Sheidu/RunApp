import { LocalizationProvider } from '@mui/lab';
import Box from '@mui/material/Box';
import { TrainingsList } from './components/TrainingsList';
import DateAdapter from '@mui/lab/AdapterMoment';

export function App() {
  return (
    <Box sx={{ flexGrow: 1, marginTop: 4 }}>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <TrainingsList />
      </LocalizationProvider>
    </Box>      
  );
}

export default App;
