import { useState, useMemo } from 'react';
import useQuizContext from '../context/useQuizContext';

const useQuestionDisplay = () => {
  const { quizState, handleAnswerQuestion, handleCompleteQuiz } = useQuizContext();
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

  const quizCurrentQuestion = quizState.currentQuestion + 1;
  const quizNumberOfQuestions = quizState.questions.length;
  const progress = (quizCurrentQuestion / quizNumberOfQuestions) * 100;

  return {
    currentQuestion,
    shuffledAnswers,
    selectedAnswer,
    showResult,
    handleAnswer,
    progress,
    quizState,
  };
};

export default useQuestionDisplay; 