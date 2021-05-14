import { createElement as $, useEffect } from 'react'
// RRD
import { Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
// Components
import { useDispatch } from 'react-redux'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import RegisterComplete from './pages/auth/RegisterComplete'
import ForgotPassword from './pages/auth/ForgotPassword'
import Header from './components/nav/Header'
import { auth } from './firebase'
import { currentUser } from './functions/auth'
import History from './pages/user/History'
import Password from './pages/user/Password'
import Wishlist from './pages/user/Wishlist'
import AdminDashboard from './pages/admin/AdminDashboard'
import CategoryCreate from './pages/admin/category/CategoryCreate'
import CategoryUpdate from './pages/admin/category/CategoryUpdate'
import SubCreate from './pages/admin/subcategory/SubCreate'
import UserRoute from './components/UserRoute'
import AdminRoute from './components/AdminRoute'
import SubUpdate from './pages/admin/subcategory/SubUpdate'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult()
        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                email: res.data.email,
                name: res.data.name,
                role: res.data.role,
                token: idTokenResult.token,
              },
            })
          })
          .catch((err) => console.log(err))
      }
    })

    // Cleanup
    return () => unsubscribe()
  }, [])
  return $(
    'div',
    { className: 'App' },
    $(Header),
    $(ToastContainer),
    $(
      Switch,
      null,
      $(Route, { path: '/', exact: true, component: Home }),
      $(Route, { path: '/login', exact: true, component: Login }),
      $(Route, { path: '/register', exact: true, component: Register }),
      $(Route, {
        path: '/register/complete',
        exact: true,
        component: RegisterComplete,
      }),
      $(Route, {
        path: '/forgot/password',
        exact: true,
        component: ForgotPassword,
      }),
      $(UserRoute, {
        path: '/user/history',
        exact: true,
        component: History,
      }),
      $(UserRoute, {
        path: '/user/password',
        exact: true,
        component: Password,
      }),
      $(UserRoute, {
        path: '/user/wishlist',
        exact: true,
        component: Wishlist,
      }),
      $(AdminRoute, {
        path: '/admin/dashboard',
        exact: true,
        component: AdminDashboard,
      }),
      $(AdminRoute, {
        path: '/admin/category',
        exact: true,
        component: CategoryCreate,
      }),
      $(AdminRoute, {
        path: '/admin/category/:slug',
        exact: true,
        component: CategoryUpdate,
      }),
      $(AdminRoute, {
        path: '/admin/sub/',
        exact: true,
        component: SubCreate,
      }),
      $(AdminRoute, {
        path: '/admin/sub/:slug',
        exact: true,
        component: SubUpdate,
      }),
    ),
  )
}

export default App
