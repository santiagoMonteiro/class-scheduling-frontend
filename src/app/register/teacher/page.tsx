'use client'
import { MainContext } from '@/contexts/MainContext'
import Link from 'next/link'
import { FormEvent, useContext, useState } from 'react'

export default function RegisterStudent() {
  const { signIn, register } = useContext(MainContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmitRegister(e: FormEvent) {
    e.preventDefault()
    await register({ name, email, password, role: 'teacher' })
  }

  return (
    <div className='min-h-screen flex items-center justify-center font-[family-name:var(--font-geist-sans)]'>
      <main className='h-full'>
        <div className='p-5 border-2 rounded-2xl'>
          <form onSubmit={handleSubmitRegister}>
            <h1 className='font-medium text-2xl mb-5'>Registrar professor</h1>

            <div className='space-y-2'>
              <input
                className='border-2 px-1 py-0.5 block rounded-md'
                type='text'
                placeholder='nome'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                className='border-2 px-1 py-0.5 block rounded-md'
                type='email'
                placeholder='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className='border-2 px-1 py-0.5 block rounded-md'
                type='password'
                placeholder='senha'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className='mt-2 space-x-5 text-base'>
              <button
                type='submit'
                className='bg-blue-500 px-4 text-white rounded-md py-1 cursor-pointer w-full'
              >
                Criar conta
              </button>
            </div>
            <Link
              className='mt-4 block opacity-65 hover:underline'
              href={'/login/student'}
            >
              Fazer login
            </Link>
            <Link
              className='block opacity-65 hover:underline'
              href={'/register/student'}
            >
              Acessar como aluno
            </Link>
          </form>
        </div>
      </main>
    </div>
  )
}
