import { createElement as $, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { auth } from '../../firebase'

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState('')

  const { user } = useSelector((state) => ({ ...state }))

  useEffect(() => {
    if (user && user.token) history.push('/')
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    }
    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail('')
        toast.success('Password Reset Link sent')
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.message)
      })
  }

  return $(
    'div',
    { className: 'container col-md-6 offset-md-3 p-5' },
    $('h4', null, 'Forgot Password ?'),
    $(
      'form',
      { onSubmit: handleSubmit },
      $('input', {
        type: 'email',
        className: 'form-control',
        value: email,
        onChange: (e) => setEmail(e.target.value),
        placeholder: 'Enter your e-mail',
        autoFocus: true,
      }),
      $('br'),
      $(
        'button',
        { className: 'btn btn-raised', disabled: !email, type: 'submit' },
        'Reset Password',
      ),
    ),
  )
}

export default ForgotPassword
