import { createElement as $ } from 'react'
import { Link } from 'react-router-dom'

const UserNav = () =>
  $(
    'nav',
    null,
    $(
      'ul',
      { className: 'nav flex-column' },
      $(
        'li',
        { className: 'nav-item' },
        $(Link, { to: '/user/history', className: 'nav-link' }, 'History'),
      ),
      $(
        'li',
        { className: 'nav-item' },
        $(Link, { to: '/user/password', className: 'nav-link' }, 'Password'),
      ),
      $(
        'li',
        { className: 'nav-item' },
        $(Link, { to: '/user/wishlist', className: 'nav-link' }, 'Wishlist'),
      ),
    ),
  )

export default UserNav
