import { Divider, Typography } from '@mui/material';
import useQuizContext from '../../context/useQuizContext.jsx';

function QuizReviewHead() {
  const { quizState } = useQuizContext();
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Quiz Results
      </Typography>

      <Typography variant="h6" color="primary" gutterBottom>
        Score: {quizState.score} / {quizState.questions.length}
      </Typography>

      <Typography variant="body1" gutterBottom>
        Cumulative Score: {quizState.cumulativeScore}
      </Typography>

      <Divider sx={{ my: 2 }} />
    </div>
  );
}

export default QuizReviewHead;
