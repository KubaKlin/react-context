import {
  Box,
  Card,
  CardContent,
  LinearProgress,
  Typography,
} from '@mui/material';
import AnswerButton from './AnswerButton';
import useDecodeHtmlEntities from '../../hooks/useDecodeHtmlEntities';
import useQuestionDisplay from '../../hooks/useQuestionDisplay';

function QuestionDisplay() {
  const {
    currentQuestion,
    shuffledAnswers,
    selectedAnswer,
    showResult,
    handleAnswer,
    progress,
    quizState,
  } = useQuestionDisplay();

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ mb: 2 }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ height: 10, borderRadius: 5 }}
        />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Question {quizState.currentQuestion + 1} of{' '}
          {quizState.questions.length}
        </Typography>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {useDecodeHtmlEntities(currentQuestion.question)}
          </Typography>

          <Typography
            variant="h4"
            color={quizState.timer <= 3 ? 'error' : 'primary'}
            sx={{ textAlign: 'center', my: 2 }}
          >
            {quizState.timer}s
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {shuffledAnswers.map((answer, index) => (
              <AnswerButton
                key={index}
                answer={useDecodeHtmlEntities(answer)}
                isSelected={selectedAnswer === answer}
                isCorrect={answer === currentQuestion.correct_answer}
                showResult={showResult}
                onClick={() => handleAnswer(answer)}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default QuestionDisplay;
