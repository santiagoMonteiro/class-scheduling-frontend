import { Bounce, toast } from 'react-toastify'

type NotificationProps = {
  type: 'ERROR' | 'SUCCESS'
  message: string
}

export function notification({ type, message }: NotificationProps) {
  if (type === 'ERROR') {
    return toast.error(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    })
  } else if (type === 'SUCCESS') {
    return toast.success(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    })
  }
}
