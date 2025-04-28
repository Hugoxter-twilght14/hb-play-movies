import Link from 'next/link'
import React from 'react'
import { LoginForm } from './LoginForm';

export default async function page() {
    
  return (
    <div>
        <p className='text-3xl font-bold text-left mb-7'>INICIAR SESIÓN</p>
        
        <LoginForm/>

        <div className='mt-5 text-center'>
            <Link href="/olvide-password" className='hover:underline hover:opacity-70'>
                ¿Olvidaste tu contraseña?
            </Link>
        </div>
        <div className='mt-4 flex gap-1'>
            <p className='text-white opacity-70'>¿Todavía no tienes cuenta?</p>
            <Link href="/register" className='opacity-1 text-white hover:text-blue-500'>
                Creala aquí
            </Link>
        </div>
    </div>
  );
}
