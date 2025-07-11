import { Box, Divider, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import useQuizContext from '../../context/useQuizContext';
import formatQuestion from '../QuestionDisplay/FormatQuestion';

function QuizReviewSummary() {
  const { quizState } = useQuizContext();

  // Pre-decode all questions, user answers, and correct answers
  const decodedQuestions = quizState.questions.map((item) => ({
    question: formatQuestion(item.question),
    correctAnswer: formatQuestion(item.correct_answer),
  }));
  const decodedUserAnswers = quizState.userAnswers.map((item) =>
    formatQuestion(item),
  );

  return (
    <div>
      {quizState.questions.map((question, index) => (
        <Box key={uuidv4()} sx={{ mb: 2 }}>
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
            Your answer: {decodedUserAnswers[index] || 'Time ran out'}
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
