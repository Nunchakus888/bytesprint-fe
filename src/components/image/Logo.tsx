import { Box, ChakraComponent } from '@chakra-ui/react'
import * as React from 'react'
import NextImage from 'next/image'
import { ComponentProps } from 'react'

interface ImageProps extends ComponentProps<ChakraComponent<'div', {}>> {}

const Logo = (props: ImageProps) => {
  const { src, alt, ...rest } = props
  return (
    <Box {...rest}>
      <img src="/img/layout/logo.png" className="object-contain w-full" />
    </Box>
  )
}

export default Logo;