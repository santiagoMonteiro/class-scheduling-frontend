'use client'
import { format } from 'date-fns'
import { MainContext } from '@/contexts/MainContext'
import { useContext, useEffect, useState } from 'react'
import { ptBR } from 'date-fns/locale'

export default function TeacherScheduleView() {
  const { logOut, fetchTeachersWithSchedule } = useContext(MainContext)

  const [teachersWithSchedule, setTeachersWithSchedule] = useState<[]>([])

  useEffect(() => {
    fetchTeachersWithSchedule().then((data) => {
      setTeachersWithSchedule(data)
    })
  }, [])

  console.log(teachersWithSchedule)

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
          {teachersWithSchedule.map((e, i) => {
            return (
              <p  className='mb-4' key={Math.random()}>
                <h2>Professor: {e.name}</h2>
                <p>email: {e.email}</p>
                {e.teacherSchedules.map((s) => {
                  const initialFormattedDate = format(
                    s.initialTime,
                    'dd/MM/yyyy - HH:mm',
                    {
                      locale: ptBR,
                    }
                  )

                  const endFormattedDate = format(s.endTime, 'HH:mm', {
                    locale: ptBR,
                  })
                  return (
                    <div key={Math.random()}>
                      <span className='font-bold'>{initialFormattedDate}h</span>{' '}
                      até <span className='font-bold'>{endFormattedDate}h</span>
                    </div>
                  )
                })}
              </p>
            )
          })}
        </div>
      </div>
    </main>
  )
}
