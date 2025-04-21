import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
import React from 'react'
import SignIn from '../_components/SignIn';

const SignInPage = async () => {

  const serverSession = await getServerSession(authOptions);

  if(serverSession?.user){
    redirect("/dashboard");
  }
  
  return (
    <>
    <SignIn/>
    </>
  )
}
export default SignInPage