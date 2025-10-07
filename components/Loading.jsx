import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loading () {
  return (
    <Box sx={{
      display: 'flex',
      height: '100dvh',
      width: '100dvw',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <CircularProgress
        size="6rem"
        color="primary"
      />
    </Box>
  );
}
