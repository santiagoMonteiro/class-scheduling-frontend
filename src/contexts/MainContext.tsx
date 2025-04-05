'use client'

import { api } from '@/lib/api'
import { notification } from '@/utils/notification'
import { AxiosError } from 'axios'
import { redirect, usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { createContext, ReactNode, useEffect, useState } from 'react'

type User = {
  id: string
  name: string
  email: string
}

type SignInData = {
  email: string
  password: string
  role: 'student' | 'teacher'
}

type RegisterData = {
  name: string
  email: string
  password: string
  role: 'student' | 'teacher'
}

type MainContextData = {
  isAuthenticated: boolean
  signIn: (data: SignInData) => Promise<void>
  userData: User | null
  logOut: () => Promise<void>
  register: (data: RegisterData) => Promise<void>
}

type MainContextProviderProps = {
  children: ReactNode
}

export const MainContext = createContext({} as MainContextData)

export function MainProvider({ children }: MainContextProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userData, setUserData] = useState<User | null>(null)
  const path = usePathname()
  const router = useRouter()

  useEffect(() => {
    const cookies = parseCookies()

    const studentToken = cookies['student.token']
    const teacherToken = cookies['teacher.token']

    if (studentToken) {
      api
        .get('/student/profile', {
          headers: {
            Authorization: `Bearer ${studentToken}`,
          },
        })
        .then((response) => {
          if (response.data.student) {
            setIsAuthenticated(true)
            setUserData(response.data.student)
            if (path === '/student/login') {
              console.log('redirect')
              router.push('/student/home')
            }
          }
        })
    } else if (teacherToken) {
      api
        .get('/teacher/profile', {
          headers: {
            Authorization: `Bearer ${teacherToken}`,
          },
        })
        .then((response) => {
          if (response.data.teacher) {
            setIsAuthenticated(true)
            setUserData(response.data.teacher)

            if (path === '/teacher/login') {
              router.push('/teacher/home')
            }
          }
        })
    } else {
      if (path.includes('home')) {
        router.push('/student/login')
      }
    }
  }, [])

  async function signIn({ email, password, role }: SignInData) {
    try {
      const response = await api.post(`/${role}/sessions`, {
        email,
        password,
      })

      const token: string = response.data.token

      if (!token) {
        notification({
          type: 'ERROR',
          message: 'Email ou Senha inválidos',
        })
        return
      } else {
        notification({
          type: 'SUCCESS',
          message: 'Login feito com sucesso',
        })

        setCookie(undefined, `${role}.token`, token, {
          maxAge: 60 * 60 * 24 * 7, // 7 days
        })

        console.log(role)

        // setIsAuthenticated(true)
        router.push(`/${role}/home`)
      }
    } catch (e) {
      console.error(e)

      if (e instanceof AxiosError) {
        if (e.status === 400) {
          notification({
            type: 'ERROR',
            message: 'Email ou Senha inválidos',
          })
        }
      }
    }
  }

  async function register({ role, email, name, password }: RegisterData) {
    api
      .post(`${role}`, {
        name,
        email,
        password,
      })
      .then((response) => {
        if (response.status === 201) {
          notification({
            type: 'SUCCESS',
            message: 'Conta criada com sucesso!',
          })
          redirect(`/${role}/login`)
        } else {
          notification({
            type: 'ERROR',
            message: 'Houve um erro na criação da conta',
          })
        }
      })
  }

  async function logOut() {
    destroyCookie(null, 'student.token')
    destroyCookie(null, 'teacher.token')
    router.push('/student/login')
  }

  return (
    <MainContext.Provider
      value={{ isAuthenticated, signIn, register, userData, logOut }}
    >
      {children}
    </MainContext.Provider>
  )
}
