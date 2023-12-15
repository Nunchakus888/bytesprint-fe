import styles from "./index.module.scss";
import React, { useCallback, useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { useCopyToClipboard } from "react-use";
import { Tooltip,Text } from "@chakra-ui/react";

interface IProps {
  text: any;
  size?: number;
}

export default function Copy({ text, size = 14 }: IProps) {
  const [isCopied, setCopied] = useState(false);
  const [, copyToClipboard] = useCopyToClipboard();

  const handleCopy = useCallback(() => {
    copyToClipboard(text);
    setCopied(true);

    // Reset the copied state after 3 seconds
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  }, [text, copyToClipboard]);

  return (
    <Tooltip
      placement="top"
      label={isCopied ? <Text>Copied!</Text> : "Copy"}
    >
      <span onClick={() => handleCopy()}>
        <FaRegCopy size={(size = 14)} className={styles.copy} />
      </span>
    </Tooltip>
  );
}
