import axios from 'axios'

// Backend call to get all subcategories
export const getSubcategories = async () => {
  const result = await axios.get(`${process.env.REACT_APP_API_URL}/subcategory`)
  return result
}

// Backend call to get a subcategory based on slug
export const getSubcategory = async (slug) => {
  const result = await axios.get(
    `${process.env.REACT_APP_API_URL}/subcategory/${slug}`,
  )
  return result
}

// Backend call to delete a subcategory
export const deleteSubcategory = async (slug, authtoken) => {
  const result = await axios.delete(
    `${process.env.REACT_APP_API_URL}/subcategory/${slug}`,
    {
      headers: {
        authtoken,
      },
    },
  )
  return result
}

// Backend call to update a subcategory
export const updateSubcategory = async (slug, subcategory, authtoken) => {
  const result = await axios.patch(
    `${process.env.REACT_APP_API_URL}/subcategory/${slug}`,
    subcategory,
    {
      headers: {
        authtoken,
      },
    },
  )
  return result
}

// Backend call to create a subcategory
export const createSubcategory = async (subcategory, authtoken) => {
  const result = await axios.post(
    `${process.env.REACT_APP_API_URL}/subcategory`,
    subcategory,
    {
      headers: {
        authtoken,
      },
    },
  )
  return result
}
