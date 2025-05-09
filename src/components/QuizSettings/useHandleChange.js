const useHandleChange = (field, setSettings) => (event) => {
  let value = event.target.value;

  // range of number of questions
  if (field === 'numberOfQuestions') {
    value = Math.max(1, Math.min(20, parseInt(value) || 1));
  }

  return setSettings((previousSettings) => ({
    ...previousSettings,
    [field]: value,
  }));
};

export default useHandleChange;
