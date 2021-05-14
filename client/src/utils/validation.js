import { toast } from 'react-toastify'

export const registrationValidation = (email, password) => {
  if (!email || !password) {
    toast.error('Please enter password !')
    return 0
  }

  if (password.length <= 6) {
    toast.error('Password should at least be 6 characters')
    return 0
  }

  return 1
}
