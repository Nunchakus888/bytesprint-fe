import Link from 'next/link';
import { Button } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'next-i18next';
import { useSession } from 'next-auth/react';
import { ButtonProps } from '@chakra-ui/button';

export default function LinkButton(props: ButtonProps) {
  const { t } = useTranslation('home');
  const session = useSession();

  const { children, ...rest } = props;

  const name = session.data?.user?.name;
  return (
    <Button
      display={{ md: 'flex' }}
      w={{ base: 'auto', md: 40 }}
      variant="darkBrand"
      color="white"
      fontSize="sm"
      fontWeight="500"
      borderRadius="70px"
      px="24px"
      py="5px"
      {...rest}
    >
      <Link className="truncate w-40" href={name ? '/admin' : '/login'}>
        {children || name || t('home.login')}
      </Link>
    </Button>
  );
}
