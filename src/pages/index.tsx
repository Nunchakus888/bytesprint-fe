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

import SignIn from '../components/sign-in';

function Home() {

  const session = useSession()

  useEffect(() => {
    if (session.status === 'authenticated') {
      Router.push('/admin/home')
    }
  }, [session]);

  return <SignIn />
}

export default Home
