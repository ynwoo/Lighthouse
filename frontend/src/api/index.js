import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

function authApiInstance() {
  const instance = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Accept: 'application/json,',
    },
    withCredentials: true,
  })
  return instance
}

export default authApiInstance
