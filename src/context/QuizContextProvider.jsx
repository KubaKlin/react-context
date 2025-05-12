import { useEffect, useState } from 'react';
import QuizContext from './QuizContext';
import useQuizTimer from '../hooks/useQuizTimer';

const initialState = {
  quizSettings: {
    numberOfQuestions: 5,
    category: 'any',
    difficulty: 'any',
  },
  currentQuestion: 0,
  questions: [],
  userAnswers: [],
  score: 0,
  cumulativeScore: 0,
  timer: 10,
  quizStatus: 'notStarted',
  categories: [],
};

export const QuizContextProvider = ({ children }) => {
  const [quizState, setQuizState] = useState(initialState);

  useEffect(() => {
    // Fetch categories on mount
    fetch('https://opentdb.com/api_category.php')
      .then((response) => response.json())
      .then((data) => {
        setQuizState((previousState) => ({
          ...previousState,
          categories: data.trivia_categories,
        }));
      })
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  const setQuizSettings = (settings) => {
    return new Promise((resolve) => {
      setQuizState((previousState) => {
        const newState = {
          ...previousState,
          quizSettings: { ...previousState.quizSettings, ...settings },
        };
        resolve(newState);
        return newState;
      });
    });
  };

  const handleAnswerQuestion = (answer) => {
    const isCorrect =
        answer === quizState.questions[quizState.currentQuestion].correct_answer;
    setQuizState((previousState) => ({
      ...previousState,
      userAnswers: [...previousState.userAnswers, answer],
      score: isCorrect ? previousState.score + 1 : previousState.score,
      cumulativeScore: isCorrect ? previousState.cumulativeScore + 1 : previousState.cumulativeScore,
      currentQuestion: previousState.currentQuestion + 1,
      timer: 10,
    }));
  };
  const handleCompleteQuiz = () => {
    setQuizState((previousState) => ({
      ...previousState,
      quizStatus: 'completed',
      cumulativeScore: previousState.cumulativeScore,
    }));
  };

  useQuizTimer({
    quizStatus: quizState.quizStatus,
    timer: quizState.timer,
    currentQuestion: quizState.currentQuestion,
    questionsLength: quizState.questions.length,
    onTimerTick: () => {
      setQuizState((previousState) => ({
        ...previousState,
        timer: previousState.timer - 1,
      }));
    },
    onTimeUp: () => handleAnswerQuestion(null),
    onComplete: handleCompleteQuiz
  });

  const setQuestions = (questions) => {
    setQuizState((previousState) => ({
      ...previousState,
      questions,
      currentQuestion: 0,
      userAnswers: [],
      score: 0,
      timer: 10,
      quizStatus: 'inProgress',
    }));
  };


  const resetQuiz = () => {
    setQuizState((previousState) => ({
      ...previousState,
      currentQuestion: 0,
      userAnswers: [],
      score: 0,
      timer: 10,
      quizStatus: 'notStarted',
    }));
  };

  const resetAll = () => {
    setQuizState({
      ...initialState,
      categories: quizState.categories,
    });
  };

  const fetchQuestions = async () => {
    // Get the latest state to ensure we have the most recent settings
    const currentState = await new Promise((resolve) => {
      setQuizState((previousState) => {
        resolve(previousState);
        return previousState;
      });
    });

    const { numberOfQuestions, category, difficulty } =
      currentState.quizSettings;
    let apiUrl = `https://opentdb.com/api.php?amount=${numberOfQuestions}`;
    if (category !== 'any') apiUrl += `&category=${category}`;
    if (difficulty !== 'any') apiUrl += `&difficulty=${difficulty}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setQuestions(data.results);
      } else {
        console.error('No questions received from the API');
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  return (
    <QuizContext.Provider
      value={{
        quizState,
        setQuizSettings,
        handleAnswerQuestion,
        handleCompleteQuiz,
        setQuestions,
        resetQuiz,
        resetAll,
        fetchQuestions,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
