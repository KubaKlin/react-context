import { Button } from '@mui/material';

const AnswerButton = ({ answer, isCorrect, showResult, onClick }) => {
  const getColor = () => {
    if (!showResult) {
      return 'primary';
    }
    if (isCorrect) {
      return 'success';
    }
    return 'error';
  };

  return (
    <Button
      variant="contained"
      color={getColor()}
      onClick={onClick}
      fullWidth
      sx={{ justifyContent: 'flex-start', textAlign: 'left' }}
    >
      {answer}
    </Button>
  );
};

export default AnswerButton;
