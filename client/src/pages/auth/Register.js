import { createElement as $, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { auth } from '../../firebase'

const Register = ({ history }) => {
  const [email, setEmail] = useState('')

  const userState = useSelector((state) => ({ ...state }))

  // When component mount check if user is not already logged in, if he is, redirect him to '/'
  useEffect(
    () => {
      if (userState.user && userState.user.token) history.push('/')
    },
    [userState.user],
    [],
  )

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const config = {
        url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
        handleCodeInApp: true,
      }

      await auth.sendSignInLinkToEmail(email, config)
      toast.success(
        `Email is send to ${email}. Click the link to complete registration`,
      )

      // Save user email in localStorage
      window.localStorage.setItem('emailForRegistration', email)

      // Clear state
      setEmail('')
    } catch (error) {
      console.log(error)
      setEmail('')
    }
  }
  return $(
    'div',
    { className: 'container p-5' },
    $(
      'div',
      { className: 'row' },
      $(
        'div',
        { className: 'col-md-6 offset-md-3' },
        $('h4', null, 'Register'),
        $('h6', null, 'Register Form'),
        $(
          'form',
          { onSubmit: handleSubmit },
          $('input', {
            type: 'email',
            className: 'form-control',
            value: email,
            onChange: (e) => setEmail(e.target.value),
            autoFocus: true,
          }),

          $(
            'button',
            { type: 'submit', className: 'btn btn-raiser' },
            'Register',
          ),
        ),
      ),
    ),
  )
}

export default Register
