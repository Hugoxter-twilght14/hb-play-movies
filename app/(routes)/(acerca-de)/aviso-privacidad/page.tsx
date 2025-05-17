import React from 'react'
import AvisoPrivacidad from '../components/AvisoPrivacidad/AvisoPrivacidad'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function page() {
  const session = await auth();
      
        if (!session || !session.user || !session.user.id) {
          return redirect("/login");
        }

  return (
    <div>
      <AvisoPrivacidad/>
    </div>
  )
}
