import { Typography, Link, Box } from '@mui/material';

export const Attribution = () => {
  return (
    <Box sx={{ mt: 'auto', pt: 2, textAlign: 'center' }}>
      <Typography 
        variant="body2" 
        color="text.secondary"
      >
        Created by <Link href="https://github.com/jhaals/yopass" color="secondary">Johan Haals</Link>
      </Typography>
    </Box>
  );
};
