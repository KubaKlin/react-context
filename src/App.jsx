import { Box, Container } from '@mui/material';
import { QuizContextProvider } from './context/QuizContextProvider';
import QuizContainer from './components/QuizContainer';

function App() {
  return (
    <QuizContextProvider>
      <Container maxWidth="sm">
        <Box
          sx={{
            py: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <QuizContainer />
        </Box>
      </Container>
    </QuizContextProvider>
  );
}

export default App;
