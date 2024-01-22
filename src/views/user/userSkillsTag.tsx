import { Box, Text, Flex, Image, Tag } from '@chakra-ui/react';
import styles from './index.module.scss';

export default function UserSkillsTag({ userInfo }: any) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      position="relative"
      marginTop="20px"
      paddingBottom="20px"
      height="150px"
      className={styles.container}
    >
      <Text fontSize={18} fontWeight="bold">
        Skills Tags
      </Text>
      <Flex justifyContent="center" margin="20px 0" gap="50px">
        {userInfo?.data?.engineer?.skillList?.map((item: string, index: number) => {
          return (
            <>
              {item && (
                <span key={`skill_${index}`} className="task-tag" style={{ padding: '5px 15px' }}>
                  {item}
                </span>
              )}
            </>

            // <Tag  size="lg" variant="solid" background="#7551FF">
            //   {item}
            // </Tag>
          );
        })}
      </Flex>
    </Box>
  );
}
