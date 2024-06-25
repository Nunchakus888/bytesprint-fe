// chakra imports
import { Box, Flex, Stack } from '@chakra-ui/react';
import Links from 'components/sidebar/components/Links';
import { IRoute } from 'common/types/navigation';

interface SidebarContentProps {
  routes?: IRoute[];
}

function SidebarContent(props: SidebarContentProps) {
  const { routes } = props;

  return (
    <Flex direction="column" height="100%" pt="12px">
      <Stack direction="column" mt="8px" mb="auto">
        <Box ps="20px" pe={{ lg: '16px', '2xl': '16px' }}>
          <Links routes={routes} />
        </Box>
      </Stack>
    </Flex>
  );
}

export default SidebarContent;
