import { useState, createElement as $ } from 'react'
import { Menu } from 'antd'
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { Link, useHistory } from 'react-router-dom'
import firebase from 'firebase'
import { useDispatch, useSelector } from 'react-redux'

const { SubMenu, Item } = Menu

const Header = () => {
  const [current, setCurrent] = useState('home')

  const dispatch = useDispatch()
  const { user } = useSelector((state) => ({ ...state }))
  const history = useHistory()

  const handleClick = (e) => {
    setCurrent(e.key)
  }

  const logout = () => {
    firebase.auth().signOut()
    dispatch({
      type: 'LOGOUT',
      payload: null,
    })
    history.push('/login')
  }

  return $(
    Menu,
    { onClick: handleClick, selectedKeys: [current], mode: 'horizontal' },

    $(
      Item,
      { key: 'home', icon: $(AppstoreOutlined) },
      $(Link, { to: '/' }, `Home`),
    ),
    user &&
      $(
        SubMenu,
        {
          icon: $(SettingOutlined),
          title: user.email && user.email.split('@')[0],
          className: 'float-right',
        },
        user &&
          user.role === 'admin' &&
          $(Item, null, $(Link, { to: '/admin/dashboard' }, 'Dashboard')),
        user &&
          user.role === 'buyer' &&
          $(Item, null, $(Link, { to: '/user/history' }, 'Dashboard')),

        $(Item, { icon: $(LogoutOutlined), onClick: logout }, 'Logout'),
      ),
    !user &&
      $(
        Item,
        { key: 'register', icon: $(UserAddOutlined), className: 'float-right' },
        $(Link, { to: '/register' }, 'Register'),
      ),

    !user &&
      $(
        Item,
        { key: 'login', icon: $(UserOutlined), className: 'float-right' },
        $(Link, { to: '/login' }, 'Login'),
      ),
  )
}

export default Header
