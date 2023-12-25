import { Box, Text, Flex,Image } from "@chakra-ui/react";
import styles from './index.module.scss'

export default function UserQualify() {
  return <Box
  display="flex"
  flexDirection="column"
  alignItems="flex-start"
  justifyContent="flex-start"
  position="relative"
  marginTop="20px"
  paddingBottom="20px"
  className={styles.container}
  >
    <Text fontSize={18} fontWeight="bold">Qualification Certificate</Text>
    <Flex justifyContent="center" margin="20px 0" gap="50px" height="210px">
      <Flex direction="column" gap="20px" width="250px">
        <Box className={styles.filename} position="relative"><i style={{width: '20px', height: '20px', marginTop: '-10px'}}></i>Business License</Box>
        <Box boxSize='sm'>
          <img src='https://bit.ly/dan-abramov' alt='Dan Abramov'  style={{width: '230px', height: '180px'}}/>
        </Box>
      </Flex>

      <Flex direction="column" gap="20px" width="250px">
        <Box className={styles.filename} position="relative"><i style={{width: '20px', height: '20px', marginTop: '-10px'}}></i>Special Qualification</Box>
        <Box boxSize='sm'>
          <img src='https://bit.ly/dan-abramov' alt='Dan Abramov'  style={{width: '230px', height: '180px'}}/>
        </Box>
      </Flex>
    </Flex>
</Box>
}