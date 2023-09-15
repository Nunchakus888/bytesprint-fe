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

import {useEffect} from "react";

import SignIn from './auth/sign-in';

function Home() {

  const session = useSession()

  useEffect(() => {
    if (session.status === 'authenticated') {
      console.log('------session', session);
      Router.push('/admin/home')
    }
  }, []);

  return <SignIn />

}

Home.Layout = Layout

export default Home
