import { Box, Text, Flex, Image, Tag } from '@chakra-ui/react';
import styles from './index.module.scss';

export default function UserSkillsTag({ userInfo }: any) {
  return (
    <>
      {userInfo?.data?.engineer?.skillList ? (
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
            Skills Tags
          </Text>
          <Flex wrap={`wrap`} justifyContent="start" margin="20px 0" gap="20px">
            {userInfo?.data?.engineer?.skillList?.map((item: string, index: number) => {
              return (
                <>
                  {item && (
                    <span
                      key={`skill_${index}`}
                      className="task-tag"
                      style={{ padding: '5px 15px' }}
                    >
                      {item}
                    </span>
                  )}
                </>
              );
            })}
          </Flex>
        </Box>
      ) : (
        ''
      )}
    </>
  );
}
