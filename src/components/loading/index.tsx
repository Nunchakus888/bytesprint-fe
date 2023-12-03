import { Box } from "@chakra-ui/react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <AiOutlineLoading3Quarters />
    </Box>
  )
}