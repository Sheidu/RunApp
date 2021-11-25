import Box from '@mui/material/Box';
import { TrainingsList } from './components/TrainingsList';

export function App() {
  return (
    <Box sx={{ flexGrow: 1, marginTop: 4 }}>
      <TrainingsList />
    </Box>      
  );
}

export default App;
