import { useContext } from 'react';
import QuizContext from './QuizContext.jsx';

const useQuizContext = () => {
  const value = useContext(QuizContext);
  if (!value) {
    throw new Error(
      'The useQuizContext hook should be used inside of the QuizContext.Provider',
    );
  }
  return value;
};

export default useQuizContext;
