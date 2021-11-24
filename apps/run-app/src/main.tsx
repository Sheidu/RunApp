import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';

import App from './app/app';
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
 
ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <App />
    </StrictMode>
  </QueryClientProvider>,
  document.getElementById('root')
);
