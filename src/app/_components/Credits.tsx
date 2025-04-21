"use server"

import { authOptions } from '@/lib/auth'
import db from '@/lib/prisma';
import { getServerSession } from 'next-auth'
import React from 'react'

async function Credits() {
  const serverSession = await getServerSession(authOptions);
  const user = await db.user.findUnique({
    where: {
      id: serverSession?.user.id,
    },
    select: {
      credits: true,
    },
  });
  
  return (
    <p className='hidden md:block'>{user?.credits} credits remaining</p>
  );
}

export default Credits