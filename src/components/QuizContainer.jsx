import { Box, Typography } from '@mui/material';
import useQuizContext from '../context/useQuizContext';
import ScoreDisplay from './ScoreDisplay';
import QuizSettings from './QuizSettings/QuizSettings';
import QuestionDisplay from './QuestionDisplay/QuestionDisplay';
import QuizReview from './QuizReview/QuizReview';

function QuizContainer() {
  const { quizState } = useQuizContext();

  const isQuizNotFinished= quizState.quizStatus === 'inProgress' && quizState.questions.length > 0

  return (
    <Box sx={{ width: '100%', maxWidth: 800 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Quiz App
      </Typography>

      <ScoreDisplay />

      {quizState.quizStatus === 'notStarted' && <QuizSettings />}

      {isQuizNotFinished && <QuestionDisplay />}

      {quizState.quizStatus === 'completed' && <QuizReview />}
    </Box>
  );
}

export default QuizContainer;
