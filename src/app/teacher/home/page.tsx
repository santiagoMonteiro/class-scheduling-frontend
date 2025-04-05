'use client'
import { MainContext } from '@/contexts/MainContext'
import Link from 'next/link'
import { useContext } from 'react'

export default function TeacherHome() {
  const { userData } = useContext(MainContext)

  console.log(userData)

  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>
      <main>
        <h1 className='font-medium text-2xl mb-5 text-center'>
          Seja bem vindo professor {userData?.name}
        </h1>
        <Link className='block p-2 border-2 rounded-md text-center' href={''}>
          Ver horários de aulas marcadas
        </Link>
        <Link
          className='block mt-4 p-2 border-2 rounded-md text-center'
          href={''}
        >
          Definir horários disponíveis para aula
        </Link>
      </main>
    </div>
  )
}
