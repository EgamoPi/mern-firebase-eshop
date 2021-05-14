import { createElement as $ } from 'react'
import AdminNav from '../../components/nav/AdminNav'

const AdminDashboard = () =>
  $(
    'div',
    { className: 'container-fluid' },
    $(
      'div',
      { className: 'row' },
      $('div', { className: 'col-md-2' }, $(AdminNav)),
      $('div', { className: 'col' }, 'Admin Page'),
    ),
  )

export default AdminDashboard
