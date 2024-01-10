import { Box, Text, Flex, Image, Tag } from '@chakra-ui/react';
import styles from './index.module.scss';

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
              justifyContent="flex-start"
              gap="30px"
              background="rgba(255,255,255,0.05)"
              borderRadius={4}
              margin="10px 0"
              padding="30px 25px"
            >
              <Flex
                justifyContent="center"
                alignItems="center"
                width="60px"
                height="60px"
                borderRadius={4}
                background="#7551FF"
              >
                Task Contract
              </Flex>
              <Flex direction="column" gap="10px">
                <Box>
                  <Text>任务名称任务名称</Text>
                </Box>
                <Flex gap="10px">
                  <Text>Task Status</Text> <Text>Contracted</Text>
                </Flex>
              </Flex>
              <Flex direction="column" gap="10px">
                <Box>
                  <Text>600.00 USDT</Text>
                </Box>
                {/* <Flex gap="10px"><Text>约合</Text> <Text>4380.00 CNY</Text></Flex> */}
              </Flex>
              <Flex direction="column" gap="10px">
                <Box>
                  <Text>质押中</Text>
                </Box>
              </Flex>
              <Flex direction="column" gap="10px">
                <Box>
                  <Text>Withdraw to Wallet</Text>
                </Box>
              </Flex>
            </Flex>
          );
        })}
      </Box>
    </Box>
  );
}
