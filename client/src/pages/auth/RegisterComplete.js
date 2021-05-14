import { createElement as $, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useDispatch /* useSelector */ } from 'react-redux'
import { auth } from '../../firebase'
import { registrationValidation } from '../../utils/validation'
import { createOrUpdateUser } from '../../functions/auth'

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  // const userState = useSelector((state) => ({ ...state }))

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForRegistration'))
  }, [])

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      if (registrationValidation(email, password) === 0) {
        return
      }
      const result = await auth.signInWithEmailLink(email, window.location.href)
      if (result.user.emailVerified) {
        // Remove user email from local storage
        window.localStorage.removeItem('emailForRegistration')
        // Get user id token
        const user = auth.currentUser
        await user.updatePassword(password)
        const idTokenResult = await user.getIdTokenResult()
        // Redux store
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                email: res.data.email,
                name: res.data.name,
                token: idTokenResult.token,
              },
            })
          })
          .catch((err) => console.log(err))
        // Redirect
        history.push('/')
      }
      toast.success(`Registration Completed`)
    } catch (error) {
      toast.error(error.message)
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
            autoFocus: true,
            disabled: true,
          }),
          $('input', {
            type: 'password',
            className: 'form-control',
            value: password,
            onChange: (e) => setPassword(e.target.value),
            autoFocus: true,
            placeholder: 'password',
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

export default RegisterComplete
