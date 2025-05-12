import { Box, Paper, Typography } from '@mui/material';
import useQuizContext from '../context/useQuizContext';

function ScoreDisplay() {
  const { quizState } = useQuizContext();

  if (quizState.quizStatus === 'notStarted') return null;

  return (
    <Paper
      elevation={2}
      sx={{
        mb: 3,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle1" color="text.secondary">
          Current Score
        </Typography>
        <Typography variant="h6" color="primary">
          {quizState.score} / {quizState.questions.length}
        </Typography>
      </Box>

      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle1" color="text.secondary">
          Cumulative Score
        </Typography>
        <Typography variant="h6" color="secondary">
          {quizState.cumulativeScore}
        </Typography>
      </Box>
    </Paper>
  );
}

export default ScoreDisplay;
