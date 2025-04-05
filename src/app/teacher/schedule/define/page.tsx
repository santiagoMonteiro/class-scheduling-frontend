'use client'
import { format } from 'date-fns'
import { MainContext } from '@/contexts/MainContext'
import { ChangeEvent, useContext, useState } from 'react'
import { ptBR } from 'date-fns/locale'

type Schedule = {
  initialTime: Date
  endTime: Date
}

export default function TeacherScheduleDefine() {
  const { logOut, registerTeacherSchedule } = useContext(MainContext)
  const [date, setDate] = useState('')
  const [initialTime, setInitialTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [schedules, setSchedules] = useState<Schedule[]>([])

  function addSchedule() {
    if (date && initialTime && endTime) {
      setSchedules([
        ...schedules,
        {
          initialTime: new Date(`${date}T${initialTime}`),
          endTime: new Date(`${date}T${endTime}`),
        },
      ])
      setDate('')
      setInitialTime('')
      setEndTime('')
    }
  }

  function handleChangeDate(e: ChangeEvent<HTMLInputElement>) {
    setDate(e.target.value)
  }

  function handleChangeInitialTime(e: ChangeEvent<HTMLInputElement>) {
    setInitialTime(e.target.value)
  }

  function handleChangeEndTime(e: ChangeEvent<HTMLInputElement>) {
    setEndTime(e.target.value)
  }

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
        <input
          className='border-2 px-1 py-0.5 block rounded-md w-62'
          type='date'
          value={date}
          onChange={handleChangeDate}
          required
        />
        <div className='flex gap-2'>
          <input
            className='border-2 px-1 py-0.5 rounded-md w-30'
            type='time'
            value={initialTime}
            onChange={handleChangeInitialTime}
            required
          />
          <input
            className='border-2 px-1 py-0.5 rounded-md w-30'
            type='time'
            value={endTime}
            onChange={handleChangeEndTime}
            required
          />
        </div>
        <div className='flex flex-col gap-2'>
          <button
            onClick={addSchedule}
            className='cursor-pointer p-2 bg-blue-500 text-white rounded-md w-62'
          >
            Adicionar
          </button>
          <button
            onClick={() => registerTeacherSchedule(schedules)}
            className='cursor-pointer p-2 bg-gray-500 text-white rounded-md w-62'
          >
            Salvar
          </button>
        </div>

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
