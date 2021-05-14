import { createElement as $, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Button } from 'antd'
import { MailOutlined, GoogleCircleFilled } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { auth, googleAuthProvider } from '../../firebase'
import { createOrUpdateUser } from '../../functions/auth'

const Login = ({ history }) => {
  // Declaring states for form control
  const [email, setEmail] = useState('j.sekretev@icloud.com')
  const [password, setPassword] = useState('bye1234')
  const [loading, setLoading] = useState(false)

  // Retrieving data from redux store
  const dispatch = useDispatch()
  const userState = useSelector((state) => ({ ...state }))

  // When component mount check if user is not already logged in, if he is, redirect him to '/'
  useEffect(
    () => {
      if (userState.user && userState.user.token) history.push('/')
    },
    [userState.user],
    [],
  )

  // Function to redirect user depending on his role
  const roleBaseRedirect = (res) => {
    if (res.data.role === 'admin') {
      history.push('/admin/dashboard')
    } else {
      history.push('/user/history')
    }
  }

  // Handling function on form submit (email & password)
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await auth.signInWithEmailAndPassword(email, password) // 1) Log in user with firebase
      const { user } = result
      const idTokenResult = await user.getIdTokenResult() // 2) To retrieve his token

      // 3) Backend call to create or update a user in MongoDB based on his token
      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          // 4a) If response exist we dispatch user info to the store and redirect him according to his role
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              email: res.data.email,
              name: res.data.name,
              role: res.data.role,
              token: idTokenResult.token,
            },
          })
          roleBaseRedirect(res)
        })
        .catch((err) => console.log(err))

      toast.success('You are logged in') // 4b) Notify user that he is logged in
    } catch (error) {
      console.log(error, loading)
      toast.error(error.message)
      setLoading(false)
    }
  }

  // Handling function on form submit (Google auth)
  const handleGoogleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider) // 1) open a new tab to login with gmail account
      .then(async (result) => {
        const { user } = result
        const idTokenResult = await user.getIdTokenResult() // 2 Retrieve user token

        // 3) Backend call to create or update a user in MongoDB based on his token
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            // 4a) If response exist we dispatch user info to the store and redirect him according to his role
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                email: res.data.email,
                name: res.data.name,
                role: res.data.role,
                token: idTokenResult.token,
              },
            })
            roleBaseRedirect(res)
          })
          .catch((err) => console.log(err))
      })
      .catch((err) => {
        console.error(err)
      })
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
        $('h4', null, 'Login'),
        $(
          'form',
          null,
          $(
            'div',
            { className: 'group-control' },
            $('input', {
              type: 'email',
              className: 'form-control',
              value: email,
              onChange: (e) => setEmail(e.target.value),
              autoFocus: true,
            }),
          ),
          $(
            'div',
            { className: 'group-control' },
            $('input', {
              type: 'password',
              className: 'form-control',
              value: password,
              onChange: (e) => setPassword(e.target.value),
            }),
          ),
          $('br'),
          $(
            Button,
            {
              type: 'primary',
              className: 'mb-3',
              onClick: handleSubmit,
              block: true,
              shape: 'round',
              icon: $(MailOutlined),
              size: 'large',
              disabled: !email || password.length < 6,
            },
            'Login with Email/Password',
          ),
          $('br'),
          $(
            Button,
            {
              type: 'danger',
              className: 'mb-3',
              onClick: handleGoogleLogin,
              block: true,
              shape: 'round',
              icon: $(GoogleCircleFilled),
              size: 'large',
            },
            'Login with Google',
          ),
          $(
            Link,
            { to: '/forgot/password', className: 'float-right text-danger' },
            'Forgot Password',
          ),
        ),
      ),
    ),
  )
}

export default Login
