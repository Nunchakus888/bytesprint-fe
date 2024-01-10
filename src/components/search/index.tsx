import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useColorModeValue,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import _ from 'lodash';
export function SearchInput(props: {
  variant?: string;
  background?: string;
  placeholder?: string;
  borderRadius?: string | number;
  searchIconColor?: string;
  search: (val: string) => void;
  [x: string]: any;
}) {
  // Pass the computed styles into the `__css` prop
  const { variant, background, searchIconColor, placeholder, borderRadius, ...rest } = props;
  // Chakra Color Mode
  // const searchIconColor = useColorModeValue('purple', '');
  const inputBg = useColorModeValue('rgba(255,255,255,0.06)', '');
  const inputText = useColorModeValue('gray.700', 'gray.100');
  const [search, setSearch] = useState('');
  const handleClick = () => {
    const format = search.trim();
    props?.search(format);
  };

  const handleChangeText = (e: any) => {
    setSearch(e.target.value);
  };
  return (
    <InputGroup w={{ base: '100%', md: '400px' }} {...rest}>
      <InputRightElement onClick={handleClick}>
        <IconButton
          aria-label="search"
          bg="inherit"
          borderRadius="inherit"
          _active={{
            bg: 'inherit',
            transform: 'none',
            borderColor: 'transparent',
          }}
          _focus={{
            boxShadow: 'none',
          }}
          _hover={{
            background: 'none',
          }}
          icon={<SearchIcon color={searchIconColor} w="15px" h="15px" />}
        />
      </InputRightElement>

      <Input
        variant="search"
        fontSize="sm"
        bg={background ? background : inputBg}
        color={inputText}
        fontWeight="500"
        _placeholder={{ color: 'gray.400', fontSize: '14px' }}
        borderRadius={borderRadius ? borderRadius : '30px'}
        placeholder={placeholder ? placeholder : 'Search...'}
        onChange={(e) => handleChangeText(e)}
        // value={search}
      />
    </InputGroup>
  );
}
