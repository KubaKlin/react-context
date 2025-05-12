const minimumQuestions = 1;
const maximumQuestions = 20;

const transformQuestionValue = (rawValue) => {
  const parsedValue = parseInt(rawValue) || minimumQuestions;
  return Math.min(maximumQuestions, Math.max(minimumQuestions, parsedValue));
};

const useHandleChange = (field, setSettings) => (event) => {
  const rawValue = event.target.value;
  const transformedValue = field === 'numberOfQuestions' 
    ? transformQuestionValue(rawValue)
    : rawValue;

  return setSettings((previousSettings) => ({
    ...previousSettings,
    [field]: transformedValue,
  }));
};

export default useHandleChange;
