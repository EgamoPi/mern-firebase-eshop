/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { createElement as $, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import {
  createSubcategory,
  getSubcategories,
  deleteSubcategory,
} from '../../../functions/subcategory'
import { getCategories } from '../../../functions/category'
import AdminNav from '../../../components/nav/AdminNav'
import CategoryForm from '../../../components/forms/CategoryForm'
import LocalSearch from '../../../components/forms/LocalSearch'

const SubCreate = () => {
  // State for form control
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const [category, setCategory] = useState('')

  // State for filtering
  const [keyword, setKeyword] = useState('')

  // Retrieve admin token
  const { user } = useSelector((state) => ({ ...state }))

  // Function to load categories and save it into the state
  const loadCategories = () => {
    getCategories().then((c) => setCategories(c.data))
  }
  // Function to load subcategories and save it into the state
  const loadSubcategories = () => {
    getSubcategories().then((c) => setSubcategories(c.data))
  }

  useEffect(() => {
    loadCategories()
    loadSubcategories()
  }, [])

  const handleSearchChange = (e) => {
    e.preventDefault()
    setKeyword(e.target.value.toLowerCase())
  }

  const searched = (kword) => (c) => c.name.toLowerCase().includes(kword)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    createSubcategory({ name, parent: category }, user.token)
      .then((res) => {
        setLoading(false)
        setName('')
        toast.success(`"${name}" is created`)
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
      deleteSubcategory(slug, user.token)
        .then((res) => {
          setLoading(false)
          toast.error(`${res.data.name} deleted !`)
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
          : $('h4', null, 'Create Sub Category'),
        $(
          'div',
          { className: 'form-group' },
          $('label', null, 'Category'),
          $(
            'select',
            {
              name: 'category',
              className: 'form-control',
              onChange: (e) => setCategory(e.target.value),
            },
            $('option', null, 'Please Select'),
            categories.length > 0 &&
              categories.map((c) =>
                $('option', { key: c._id, value: c._id }, c.name),
              ),
          ),
        ),
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
        subcategories.filter(searched(keyword)).map((s) =>
          $(
            'div',
            { className: 'alert alert-primary', key: s._id },
            `${s.name} `,
            $(
              'span',
              {
                className: 'btn btn-sm float-right',
                onClick: () => handleRemove(s.slug),
              },
              $(DeleteOutlined, { className: 'text-danger' }),
            ),
            $(
              Link,
              { to: `/admin/sub/${s.slug}` },
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
export default SubCreate
