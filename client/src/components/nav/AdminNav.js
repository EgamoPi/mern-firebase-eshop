import { createElement as $ } from 'react'
import { Link } from 'react-router-dom'

const AdminNav = () =>
  $(
    'nav',
    null,
    $(
      'ul',
      { className: 'nav flex-column' },
      $(
        'li',
        { className: 'nav-item' },
        $(Link, { to: '/admin/dashboard', className: 'nav-link' }, 'Dashboard'),
      ),
      $(
        'li',
        { className: 'nav-item' },
        $(Link, { to: '/admin/product', className: 'nav-link' }, 'Product'),
      ),
      $(
        'li',
        { className: 'nav-item' },
        $(Link, { to: '/admin/products', className: 'nav-link' }, 'Products'),
      ),
      $(
        'li',
        { className: 'nav-item' },
        $(Link, { to: '/admin/category', className: 'nav-link' }, 'Category'),
      ),
      $(
        'li',
        { className: 'nav-item' },
        $(Link, { to: '/admin/sub', className: 'nav-link' }, 'Sub Category'),
      ),
      $(
        'li',
        { className: 'nav-item' },
        $(Link, { to: '/admin/coupon', className: 'nav-link' }, 'Coupon'),
      ),
      $(
        'li',
        { className: 'nav-item' },
        $(Link, { to: '/user/password', className: 'nav-link' }, 'Password'),
      ),
    ),
  )

export default AdminNav
