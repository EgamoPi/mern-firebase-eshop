import { createElement as $ } from 'react'
import UserNav from '../../components/nav/UserNav'

const Wishlist = () =>
  $(
    'div',
    { className: 'container-fluid' },
    $(
      'div',
      { className: 'row' },
      $('div', { className: 'col-md-2' }, $(UserNav)),
      $('div', { className: 'col' }, 'User Wishlist'),
    ),
  )

export default Wishlist
