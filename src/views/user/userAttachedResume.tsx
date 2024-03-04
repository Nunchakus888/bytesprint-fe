import { Box, Text, Flex, Image, Tag, Link } from '@chakra-ui/react';
import styles from './index.module.scss';

export default function UserAttachedResume(props: { data: any }) {
  const { data } = props;
  const certificate = data?.data?.engineer?.certificateList?.[0] || {};
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      position="relative"
      marginTop="20px"
      paddingBottom="20px"
      className={styles.container}
    >
      <Text fontSize={18} fontWeight="bold">
        Attached Resume
      </Text>
      <Box justifyContent="center" margin="20px 0" width="100%">
        <Link href={certificate.path} target="_blank" color="#F59A23" fontSize={36}>
          {certificate.name}
        </Link>
        {/* <Text margin="20px 0">{certificate.time} Update</Text> */}
        <Link
          fontSize={18}
          color="#7551FF"
          fontWeight="bold"
          onClick={() => {
            window.open(certificate.path, '_blank');
          }}
          position="absolute"
          top="20px"
          right="40px"
        >
          Preview
        </Link>
      </Box>
    </Box>
  );
}
