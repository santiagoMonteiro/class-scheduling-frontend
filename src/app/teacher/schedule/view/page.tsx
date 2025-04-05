'use client'
import { format } from 'date-fns'
import { MainContext } from '@/contexts/MainContext'
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { ptBR } from 'date-fns/locale'

type Schedule = {
  initialTime: Date
  endTime: Date
}

export default function TeacherScheduleView() {
  const { logOut, fetchTeacherSchedule, userData } = useContext(MainContext)

  const [schedules, setSchedules] = useState<Schedule[]>([])

  useEffect(() => {
    if (userData) {
      fetchTeacherSchedule(userData.id).then((data) => {
        console.log
      })
    }
  }, [])

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
          Definir horários disponíveis para aula
        </h1>
        <p className='mb-6'>
          Defina a data, o horário de início e o horário de término
        </p>

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
              <>
                <p key={i}>
                  <span className='font-bold'>{initialFormattedDate}h</span> até{' '}
                  <span className='font-bold'>{endFormattedDate}h</span>
                </p>
              </>
            )
          })}
        </div>
      </div>
    </main>
  )
}
