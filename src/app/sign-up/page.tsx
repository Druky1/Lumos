import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
import React from 'react'
import SignUp from '../_components/SignUp';

const SignUpPage = async () => {

  const serverSession = await getServerSession(authOptions);

  if(serverSession?.user){
    redirect("/dashboard");
  }
  
  return (
    <>
    <SignUp/>
    </>
  )
}
export default SignUpPage