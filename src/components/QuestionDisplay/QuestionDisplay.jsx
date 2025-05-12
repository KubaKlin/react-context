import { useMemo, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  LinearProgress,
  Typography,
} from '@mui/material';
import AnswerButton from './AnswerButton';
import useQuizContext from '../../context/useQuizContext';

function QuestionDisplay() {
  const { quizState, handleAnswerQuestion, handleCompleteQuiz } =
    useQuizContext();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = quizState.questions[quizState.currentQuestion];

  const answers = [
    currentQuestion.correct_answer,
    ...currentQuestion.incorrect_answers,
  ];

  const shuffledAnswers = useMemo(() => {
    setSelectedAnswer(null);
    setShowResult(false);
    return [...answers].sort(() => Math.random() - 0.5);
  }, [currentQuestion]);

  const handleAnswer = (answer) => {
    if (selectedAnswer !== null) {
      return;
    }

    setSelectedAnswer(answer);
    setShowResult(true);

    setTimeout(() => {
      handleAnswerQuestion(answer);
      if (quizState.currentQuestion + 1 === quizState.questions.length) {
        handleCompleteQuiz();
      }
    }, 1500);
  };

  const progress =
    ((quizState.currentQuestion + 1) / quizState.questions.length) * 100;

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
            {currentQuestion.question}
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
                answer={answer}
                isSelected={selectedAnswer === answer}
                isCorrect={answer === currentQuestion.correct_answer}
                showResult={showResult}
                onAnswer={handleAnswer}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default QuestionDisplay;
