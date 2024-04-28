import { Box, Spinner } from '@chakra-ui/react';

export default function Loading() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" padding="20px">
      <Spinner />
    </Box>
  );
}
