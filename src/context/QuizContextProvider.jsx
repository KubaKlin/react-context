import { useEffect, useState } from 'react';
import QuizContext from './QuizContext';

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
      currentQuestion: previousState.currentQuestion + 1,
      timer: 10,
    }));
  };

  useEffect(() => {
    let timer;
    if (quizState.quizStatus === 'inProgress' && quizState.timer > 0) {
      timer = setInterval(() => {
        setQuizState((previousState) => ({
          ...previousState,
          timer: previousState.timer - 1,
        }));
      }, 1000);
    } else if (quizState.timer === 0 && quizState.quizStatus === 'inProgress') {
      handleAnswerQuestion(null);
      if (quizState.currentQuestion === quizState.questions.length) {
        handleCompleteQuiz();
      }
    }
    return () => clearInterval(timer);
  }, [
    quizState.timer,
    quizState.quizStatus,
    quizState.currentQuestion,
    quizState.questions.length,
  ]);

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

  const handleCompleteQuiz = () => {
    setQuizState((previousState) => ({
      ...previousState,
      quizStatus: 'completed',
      cumulativeScore: previousState.cumulativeScore + previousState.score,
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
        setQuestions,
        handleCompleteQuiz,
        resetQuiz,
        resetAll,
        fetchQuestions,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
