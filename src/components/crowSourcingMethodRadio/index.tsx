import { Box, useRadio } from '@chakra-ui/react';

export default function RadioCard(props: any) {
  // @ts-ignore
  const { getInputProps, getRadioProps } = useRadio(props);
  console.log('getRadioProps>>>', getRadioProps);
  const input = getInputProps();
  // const checkbox = getRadioProps()

  return (
    <Box as="label">
      <input {...input} />
      <Box
        // {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: 'teal.600',
          color: 'white',
          borderColor: 'teal.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}
