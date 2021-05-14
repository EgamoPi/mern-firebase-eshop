/* eslint-disable no-unused-vars */
import { createElement as $, useState } from 'react'
import { toast } from 'react-toastify'
import { auth } from '../../firebase'
import UserNav from '../../components/nav/UserNav'

const Password = () => {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)
      await auth.currentUser.updatePassword(password)
      setLoading(false)
      setPassword('')
      toast.success('Password Updated')
    } catch (error) {
      setLoading(false)
      toast.error(error.message)
    }
  }

  return $(
    'div',
    { className: 'container-fluid' },
    $(
      'div',
      { className: 'row' },
      $('div', { className: 'col-md-2' }, $(UserNav)),
      $(
        'form',
        { onSubmit: handleSubmit },
        $(
          'div',
          { className: 'col' },
          loading
            ? $('h4', { className: 'text-danger' }, 'Loading..')
            : $('h4', null, 'Password update'),
          $(
            'div',
            { className: 'form-group' },
            $('br'),
            $('label', null, 'Your password'),
            $('input', {
              type: 'password',
              onChange: (e) => setPassword(e.target.value),
              className: 'form-control',
              placeholder: 'Enter new password',
              disabled: loading,
              value: password,
            }),
            $(
              'button',
              {
                className: 'btn btn-primary',
                disabled: !password || password.length <= 6 || loading,
              },
              'Submit',
            ),
          ),
        ),
      ),
    ),
  )
}
export default Password
