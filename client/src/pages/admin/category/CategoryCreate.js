/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { createElement as $, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import {
  createCategory,
  getCategories,
  deleteCategory,
} from '../../../functions/category'
import AdminNav from '../../../components/nav/AdminNav'
import CategoryForm from '../../../components/forms/CategoryForm'
import LocalSearch from '../../../components/forms/LocalSearch'

const CategoryCreate = () => {
  // State for form control
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])

  // State for filtering
  const [keyword, setKeyword] = useState('')

  // Retrieve admin token
  const { user } = useSelector((state) => ({ ...state }))

  // Function to load categories and save it into the state
  const loadCategories = () => {
    getCategories().then((category) => setCategories(category.data))
  }

  useEffect(() => {
    loadCategories()
  }, [])

  const handleSearchChange = (e) => {
    e.preventDefault()
    setKeyword(e.target.value.toLowerCase())
  }

  const searched = (kword) => (c) => c.name.toLowerCase().includes(kword)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    createCategory({ name }, user.token)
      .then((res) => {
        setLoading(false)
        setName('')
        toast.success(`"${name}" is created`)
        loadCategories()
      })
      .catch((err) => {
        setLoading(false)
        console.log(err.response)
        if (err.response.status === 400) toast.error(err.response.data.name)
        setName('')
      })
  }

  const handleRemove = async (slug) => {
    if (window.confirm('Delete')) {
      setLoading(true)
      deleteCategory(slug, user.token)
        .then((res) => {
          setLoading(false)
          toast.error(`${res.data.name} deleted !`)
          loadCategories()
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false)
            toast.error(err.response.data.name)
          }
        })
    }
  }
  return $(
    'div',
    { className: 'container-fluid' },
    $(
      'div',
      { className: 'row' },
      $('div', { className: 'col-md-2' }, $(AdminNav)),
      $(
        'div',
        { className: 'col' },
        loading
          ? $('h4', { className: 'text-danger' }, 'Loading ...')
          : $('h4', null, 'Create Category'),
        $(CategoryForm, {
          handleSubmit,
          name,
          setName,
        }),
        $(LocalSearch, {
          keyword,
          setKeyword,
        }),
        $('br'),
        categories.filter(searched(keyword)).map((c) =>
          $(
            'div',
            { className: 'alert alert-primary', key: c._id },
            `${c.name} `,
            $(
              'span',
              {
                className: 'btn btn-sm float-right',
                onClick: () => handleRemove(c.slug),
              },
              $(DeleteOutlined, { className: 'text-danger' }),
            ),
            $(
              Link,
              { to: `/admin/category/${c.slug}` },
              $(
                'span',
                { className: 'btn btn-sm float-right' },
                $(EditOutlined, { className: 'text-warning' }),
              ),
            ),
          ),
        ),
      ),
    ),
  )
}
export default CategoryCreate
