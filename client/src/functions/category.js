import axios from 'axios'

// Backend call to get all categories
export const getCategories = async () => {
  const result = await axios.get(`${process.env.REACT_APP_API_URL}/category`)
  return result
}

// Backend call to get a category based on slug
export const getCategory = async (slug) => {
  const result = await axios.get(
    `${process.env.REACT_APP_API_URL}/category/${slug}`,
  )
  return result
}

// Backend call to delete a category
export const deleteCategory = async (slug, authtoken) => {
  const result = await axios.delete(
    `${process.env.REACT_APP_API_URL}/category/${slug}`,
    {
      headers: {
        authtoken,
      },
    },
  )
  return result
}

// Backend call to update a category
export const updateCategory = async (slug, category, authtoken) => {
  const result = await axios.patch(
    `${process.env.REACT_APP_API_URL}/category/${slug}`,
    category,
    {
      headers: {
        authtoken,
      },
    },
  )
  return result
}

// Backend call to create a category
export const createCategory = async (category, authtoken) => {
  const result = await axios.post(
    `${process.env.REACT_APP_API_URL}/category`,
    category,
    {
      headers: {
        authtoken,
      },
    },
  )
  return result
}
