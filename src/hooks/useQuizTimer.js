import { useEffect } from 'react';

const useQuizTimer = ({
  quizStatus,
  timer,
  currentQuestion,
  questionsLength,
  onTimerTick,
  onTimeUp,
  onComplete,
}) => {
  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (quizStatus === 'inProgress' && timer > 0) {
        onTimerTick();
      } else if (timer === 0 && quizStatus === 'inProgress') {
        onTimeUp();
        if (currentQuestion === questionsLength) {
          onComplete();
        }
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [
    quizStatus,
    timer,
    currentQuestion,
    questionsLength,
    onTimerTick,
    onTimeUp,
    onComplete,
  ]);
};

export default useQuizTimer;
