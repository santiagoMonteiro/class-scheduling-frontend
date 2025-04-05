'use client'
import { MainContext } from '@/contexts/MainContext'
import Link from 'next/link'
import { useContext } from 'react'

export default function StudentHome() {
  const { userData, logOut } = useContext(MainContext)

  console.log(userData)

  return (
    <>
      <button
        onClick={logOut}
        className='cursor-pointer p-2 absolute top-4 right-4 bg-black rounded-md text-white'
      >
        Log out
      </button>
      <main>
        <h1 className='font-medium text-2xl mb-5 text-center'>
          Seja bem vindo aluno {userData?.name}
        </h1>
        <Link
          className='block p-2 border-2 rounded-md text-center'
          href={'schedule/view'}
        >
          Ver horários dos professores
        </Link>
        <Link
          className='block mt-4 p-2 border-2 rounded-md text-center'
          href={''}
        >
          Marcar horário de aula
        </Link>
      </main>
    </>
  )
}
