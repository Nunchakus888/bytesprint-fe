import {
  Layout,
  Text,
  Page,
  Link,
  Code,
  Snippet,
  Button,
} from '@vercel/examples-ui'
import { getCsrfToken, signIn, useSession, signOut } from 'next-auth/react'
import { SiweMessage } from 'siwe'
import { useAccount, useConnect, useNetwork, useSignMessage } from 'wagmi'

import Router from 'next/router'

import { useEffect } from "react";

import SignIn from 'components/sign-in';
import Index from 'components/index/Index';

function Home() {

  const session = useSession()

  /*useEffect(() => {
    if (session.status === 'authenticated') {
      Router.push('/admin')
    }
  }, [session]);*/

  return <Index />
}

export default Home
