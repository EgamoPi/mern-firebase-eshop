import axios from 'axios'

// Backend call to create or update a user in MongoDB based on his token (set in headers)
export const createOrUpdateUser = async (authtoken) => {
  const result = await axios.post(
    `${process.env.REACT_APP_API_URL}/create-or-update-user`,
    {},
    {
      headers: {
        authtoken,
      },
    },
  )
  return result
}

// Backend call to retrieve current user data
export const currentUser = async (authtoken) => {
  const result = await axios.post(
    `${process.env.REACT_APP_API_URL}/current-user`,
    {},
    {
      headers: {
        authtoken,
      },
    },
  )
  return result
}

export const currentAdmin = async (authtoken) => {
  const result = await axios.post(
    `${process.env.REACT_APP_API_URL}/current-admin`,
    {},
    {
      headers: {
        authtoken,
      },
    },
  )
  return result
}
