import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Back() {
  const router = useRouter();
  return (
    <Button background="rgba(255,255,255,0.05)" size='sm' borderRadius={4} onClick={() => router.back()}>
          Back
        </Button>
  )
}