import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import useQuizContext from '../../context/useQuizContext';
import useHandleChange from './useHandleChange';

function QuizSettings() {
  const { quizState, setQuizSettings, fetchQuestions } = useQuizContext();
  const [settings, setSettings] = useState(quizState.quizSettings);

  const handleStartQuiz = async () => {
    try {
      // Ensure settings are valid before starting
      const validatedSettings = {
        ...settings,
        numberOfQuestions: settings.numberOfQuestions || 10,
        category: settings.category || 'any',
        difficulty: settings.difficulty || 'any',
      };

      await setQuizSettings(validatedSettings);
      await fetchQuestions();
    } catch (error) {
      console.error('Error starting quiz:', error);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 3,
        borderRadius: 2,
        bgcolor: 'background.paper',
        boxShadow: 1,
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        Quiz Settings
      </Typography>

      <TextField
        label="Number of Questions"
        type="number"
        value={settings.numberOfQuestions}
        onChange={useHandleChange('numberOfQuestions', setSettings)}
        fullWidth
      />

      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Select
          variant="outlined"
          value={settings.category}
          label="Category"
          onChange={useHandleChange('category', setSettings)}
        >
          <MenuItem value="any">Any Category</MenuItem>
          {quizState.categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Difficulty</InputLabel>
        <Select
          variant="outlined"
          value={settings.difficulty}
          label="Difficulty"
          onChange={useHandleChange('difficulty', setSettings)}
        >
          <MenuItem value="any">Any Difficulty</MenuItem>
          <MenuItem value="easy">Easy</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="hard">Hard</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        onClick={handleStartQuiz}
        size="large"
        fullWidth
      >
        Start Quiz
      </Button>
    </Box>
  );
}

export default QuizSettings;
