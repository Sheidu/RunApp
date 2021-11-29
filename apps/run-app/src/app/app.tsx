import { LocalizationProvider } from '@mui/lab';
import Box from '@mui/material/Box';
import { TrainingsList } from './components/TrainingsList';
import DateAdapter from '@mui/lab/AdapterMoment';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient()

export function App() {
  return (
    <Box sx={{ flexGrow: 1, marginTop: 4 }}>
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <TrainingsList />
        </LocalizationProvider>
      </QueryClientProvider>
    </Box>      
  );
}

export default App;
