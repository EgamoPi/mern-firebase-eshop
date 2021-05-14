/* eslint-disable no-unused-vars */
import { createElement as $, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { getCategory, updateCategory } from '../../../functions/category'
import AdminNav from '../../../components/nav/AdminNav'
import CategoryForm from '../../../components/forms/CategoryForm'

const CategoryUpdate = ({ history, match }) => {
  // State for form control
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  // Retrieve admin token
  const { user } = useSelector((state) => ({ ...state }))

  // Function to load categories and save it into the state
  const loadCategory = () =>
    getCategory(match.params.slug).then((c) => setName(c.data.name))

  useEffect(() => {
    loadCategory()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    updateCategory(match.params.slug, { name }, user.token)
      .then((res) => {
        setLoading(false)
        setName('')
        toast.success(`"${res.data.name}" has been updated`)
        history.push('/admin/category')
      })
      .catch((err) => {
        setLoading(false)
        if (err.response.status === 400) toast.error(err.response.data.name)
      })
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
          : $('h4', null, 'Update Category'),
        $(CategoryForm, {
          handleSubmit,
          name,
          setName,
        }),
        $('br'),
      ),
    ),
  )
}

export default CategoryUpdate
