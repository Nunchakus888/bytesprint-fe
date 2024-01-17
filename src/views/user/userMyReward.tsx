import styles from './index.module.scss';
import { Box, Text, Flex, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { GoLinkExternal } from 'react-icons/go';

export default function UserMyReward(props: { data: any[] }) {
  const { data } = props;
  return (
    <Box
      display="flex"
      flex={1}
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      position="relative"
      marginTop="20px"
      paddingBottom="20px"
      height="500px"
      overflow="scroll"
      width="100%"
      className={styles.container}
    >
      <Text fontSize={18} fontWeight="bold">
        My Rewards
      </Text>
      <Box justifyContent="center" margin="20px 0" width="100%">
        {data.map((it, index) => {
          return (
            <Flex
              key={`ex_${index}`}
              justifyContent="space-between"
              alignItems="center"
              gap="10px"
              background="#18191F"
              borderRadius={4}
              margin="10px 0"
              padding="30px 25px"
            >
              <Flex direction="column" gap="5px">
                <Box>
                  <Text fontSize="14px" color="#7B7E8F">
                    任务名称任务名称
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="22px" className="flex items-center font-bold">
                    600.00
                    <Text fontSize="16px" className="ml-2">
                      USDT
                    </Text>
                  </Text>
                </Box>
                {/* <Flex gap="5px">
                  <Text fontSize="10px" whiteSpace="nowrap">
                    Task Status
                  </Text>{' '}
                  <Text fontSize="10px">Contracted</Text>
                </Flex> */}
              </Flex>
              <Flex direction="column" gap="10px">
                <Link href={'./'}>
                  <Text color="#7B7E8F" className="flex items-center underline">
                    0x81Aa...fd3817 <GoLinkExternal className="ml-2" />
                  </Text>
                </Link>
                <Button size={'sm'} className="btn-primary">
                  Withdraw {'>'}
                </Button>
              </Flex>
              {/* <Flex direction="column" gap="10px">
                <Box>
                  <Text fontSize="12px">质押中</Text>
                </Box>
              </Flex> */}
            </Flex>
          );
        })}
      </Box>
    </Box>
  );
}
