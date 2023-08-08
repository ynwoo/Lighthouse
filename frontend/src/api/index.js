import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL
function apiInstance() {
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

function authApiInstance() {
  const instance = apiInstance()
  instance.interceptors.request.use(config => {
    const accessToken = sessionStorage.getItem('access_token')
    const refreshToken = sessionStorage.getItem('refresh_token')

    config.headers['access-token'] = accessToken
    config.headers['refresh-token'] = refreshToken
    return config
  })

  instance.interceptors.response.use(
    function (response) {
      return response
    },
    async function (err) {
      console.log(axios.defaults.headers)
      console.log(err)
      if (err.response && err.response.status === 401) {
        try {
          console.log('try 진입')
          delete axios.defaults.headers.common['access-token']
          console.log(axios.defaults.headers.common)
          const response = await instance.post(`${API_URL}/users/refresh`)
          console.log(response)
          const newAccessToken = response.headers['access-token']
          sessionStorage.setItem('access_token', newAccessToken)
          window.location.reload()
        } catch (error) {
          alert('로그인이 필요합니다!')
          window.location.href = '/login'
        }
        return Promise.reject(err)
      }
      console.log('hmm...')
      alert('로그인이 필요합니다!')
      window.location.href = '/login'
      return Promise.reject(err)
    },
  )
  return instance
}

export { apiInstance, authApiInstance }
