import { Box, Divider, Typography } from '@mui/material';
import useQuizContext from '../../context/useQuizContext';
import useDecodeHtmlEntities from '../../hooks/useDecodeHtmlEntities';

function QuizReviewSummary() {
  const { quizState } = useQuizContext();

  return (
    <div>
      {quizState.questions.map((question, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            {index + 1}. {useDecodeHtmlEntities(question.question)}
          </Typography>

          <Typography
            variant="body2"
            color={
              quizState.userAnswers[index] === question.correct_answer
                ? 'success'
                : 'error'
            }
          >
            Your answer:{' '}
            {useDecodeHtmlEntities(quizState.userAnswers[index]) ||
              'Time ran out'}
          </Typography>

          {quizState.userAnswers[index] !== question.correct_answer && (
            <Typography variant="body2" color="success.main">
              Correct answer: {useDecodeHtmlEntities(question.correct_answer)}
            </Typography>
          )}

          <Divider sx={{ my: 1 }} />
        </Box>
      ))}
    </div>
  );
}

export default QuizReviewSummary;
