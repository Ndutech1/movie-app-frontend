import { Box, CircularProgress, Typography } from '@mui/material';

const Spinner = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="50vh"
    >
      <CircularProgress />
      <Typography mt={2}>Loading...</Typography>
    </Box>
  );
};

export default Spinner;
