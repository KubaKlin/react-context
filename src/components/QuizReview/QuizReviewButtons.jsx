import { Box, Button } from '@mui/material';
import useQuizContext from '../../hooks/useQuizContext';

function QuizReviewButtons() {
  const { resetQuiz, resetAll } = useQuizContext();

  return (
    <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
      <Button variant="contained" color="primary" onClick={resetQuiz} fullWidth>
        New Quiz
      </Button>

      <Button variant="outlined" color="secondary" onClick={resetAll} fullWidth>
        Reset All Scores
      </Button>
    </Box>
  );
}

export default QuizReviewButtons;
