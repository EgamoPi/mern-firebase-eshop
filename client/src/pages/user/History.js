import { createElement as $ } from 'react'
import UserNav from '../../components/nav/UserNav'

const History = () =>
  $(
    'div',
    { className: 'container-fluid' },
    $(
      'div',
      { className: 'row' },
      $('div', { className: 'col-md-2' }, $(UserNav)),
      $('div', { className: 'col' }, 'User Page'),
    ),
  )

export default History
