'use client'
import { format } from 'date-fns'
import { MainContext } from '@/contexts/MainContext'
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { ptBR } from 'date-fns/locale'

export default function TeacherScheduleView() {
  const { logOut, fetchTeacherSchedule } = useContext(MainContext)

  const [schedules, setSchedules] = useState<[]>([])

  useEffect(() => {
    fetchTeacherSchedule().then((data) => {
      setSchedules(data)
    })
  }, [])

  console.log(schedules)

  return (
    <main>
      <button
        onClick={logOut}
        className='cursor-pointer p-2 absolute top-4 right-4 bg-black rounded-md text-white'
      >
        Log out
      </button>
      <div className='space-y-2 flex flex-col justify-center items-center'>
        <h1 className='font-medium text-2xl mb-5 text-center'>
          Lista de horários definidos para aula
        </h1>
        <p className='mb-6'>Horários</p>

        <div>
          {schedules.map((e, i) => {
            const initialFormattedDate = format(
              e.initialTime,
              'dd/MM/yyyy - HH:mm',
              {
                locale: ptBR,
              }
            )

            const endFormattedDate = format(e.endTime, 'HH:mm', {
              locale: ptBR,
            })
            return (
              <p key={i}>
                <span className='font-bold'>{initialFormattedDate}h</span> até{' '}
                <span className='font-bold'>{endFormattedDate}h</span>
              </p>
            )
          })}
        </div>
      </div>
    </main>
  )
}
