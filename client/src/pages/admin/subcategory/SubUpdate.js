/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { createElement as $, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  updateSubcategory,
  getSubcategory,
} from '../../../functions/subcategory'
import { getCategories } from '../../../functions/category'
import AdminNav from '../../../components/nav/AdminNav'
import CategoryForm from '../../../components/forms/CategoryForm'

const SubUpdate = ({ match, history }) => {
  // State for form control
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [parent, setParent] = useState('')

  // Retrieve admin token
  const { user } = useSelector((state) => ({ ...state }))

  // Function to load categories and save it into the state
  const loadCategories = () => {
    getCategories().then((c) => setCategories(c.data))
  }
  // Function to load subcategories and save it into the state
  const loadSubcategory = () => {
    getSubcategory(match.params.slug, user.token).then((s) => {
      setName(s.data.name)
      setParent(s.data.parent)
    })
  }

  useEffect(() => {
    loadCategories()
    loadSubcategory()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    updateSubcategory(match.params.slug, { name, parent }, user.token)
      .then((res) => {
        setLoading(false)
        setName('')
        toast.success(`"${name}" is updated`)
        history.push('/admin/sub')
      })
      .catch((err) => {
        setLoading(false)
        console.log(err.response)
        if (err.response.status === 400) toast.error(err.response.data.name)
        setName('')
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
          : $('h4', null, 'Update Sub Category'),
        $(
          'div',
          { className: 'form-group' },
          $('label', null, 'Category'),
          $(
            'select',
            {
              name: 'category',
              className: 'form-control',
              onChange: (e) => setParent(e.target.value),
            },
            $('option', null, 'Please Select'),
            categories.length > 0 &&
              categories.map((c) =>
                $(
                  'option',
                  { key: c._id, value: c._id, selected: c._id === parent },
                  c.name,
                ),
              ),
          ),
        ),
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
export default SubUpdate
