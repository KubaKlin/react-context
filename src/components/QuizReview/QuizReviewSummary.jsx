import { Box, Divider, Typography } from '@mui/material';
import useQuizContext from '../../context/useQuizContext';
import useDecodeHtmlEntities from '../../hooks/useDecodeHtmlEntities';

function QuizReviewSummary() {
  const { quizState } = useQuizContext();

  // Pre-decode all questions, user answers, and correct answers
  const decodedQuestions = quizState.questions.map((q) => ({
    question: useDecodeHtmlEntities(q.question),
    correctAnswer: useDecodeHtmlEntities(q.correct_answer),
  }));
  const decodedUserAnswers = quizState.userAnswers.map((a) => useDecodeHtmlEntities(a));

  return (
    <div>
      {quizState.questions.map((question, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            {index + 1}. {decodedQuestions[index].question}
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
            {decodedUserAnswers[index] || 'Time ran out'}
          </Typography>

          {quizState.userAnswers[index] !== question.correct_answer && (
            <Typography variant="body2" color="success.main">
              Correct answer: {decodedQuestions[index].correctAnswer}
            </Typography>
          )}

          <Divider sx={{ my: 1 }} />
        </Box>
      ))}
    </div>
  );
}

export default QuizReviewSummary;
