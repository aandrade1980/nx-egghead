import { Box, CircularProgress } from '@material-ui/core';

/* eslint-disable-next-line */
export interface SpinnerProps {}

export function Spinner(props: SpinnerProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
      <CircularProgress />
    </Box>
  );
}

export default Spinner;
