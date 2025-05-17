import React from 'react'
import SobreNosotros from '../components/SobreNosotros/SobreNosotros'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function page() {
  const session = await auth();
        
    if (!session || !session.user || !session.user.id) {
      return redirect("/login");
    }

  return (
    <div>
        <SobreNosotros/>
    </div>
  )
}
