import { Box, Card, CardContent } from '@mui/material';
import QuizReviewButtons from './QuizReviewButtons';
import QuizReviewHead from './QuizReviewHead';
import QuizReviewSummary from './QuizReviewSummary';

function QuizReview() {
  return (
    <Box sx={{ width: '100%' }}>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <QuizReviewHead />
          <QuizReviewSummary />
          <QuizReviewButtons />
        </CardContent>
      </Card>
    </Box>
  );
}

export default QuizReview;
