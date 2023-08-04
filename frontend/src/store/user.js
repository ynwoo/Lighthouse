import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

// custom axios for axios interceptor
// const authApi = axios.create({
//   baseURL: 'url',
//   headers: {
//     'content-type': 'application/json;charset=UTF-8',
//     accept: 'application/json,',
//   },
//   withCredentials: true,
// })

// const accessToken = sessionStorage.getItem('access_token')
// const refreshToken = sessionStorage.getItem('refresh_token')

// authApi.interceptors.request.use(function (config) {
//   console.log(accessToken)
//   console.log(refreshToken)
//   console.log('썼다 임마')
//   axios.defaults.headers.common['access-token'] = accessToken
//   axios.defaults.headers.common['refresh-token'] = refreshToken
//   return config
// })

// authApi.interceptors.response.use(
//   function (response) {
//     return response
//   },
//   async function (err) {
//     console.log(err)
//     if (err.response && err.response.status === 404) {
//       try {
//         console.log('try 진입')
//         const getRefreshToken = await sessionStorage.getItem('refresh_token')
//         axios.defaults.headers.common['refresh-token'] = getRefreshToken
//         // delete axios.defaults.headers.common.Accept
//         delete axios.defaults.headers.common['access-token']
//         console.log(axios.defaults.headers.common)
//         const response = await axios.post(`${API_URL}/users/refresh`)
//         console.log(response)
//         const newAccessToken = response.headers.Authorization
//         sessionStorage.setItem('access_token', newAccessToken)
//         window.location.reload()
//       } catch (error) {
//         console.log('이거이거 안되겠는걸')
//         // window.location.href = '/'
//       }
//       return Promise.reject(err)
//     }
//     console.log('hmm...')
//     return Promise.reject(err)
//   },
// )

// 이것은 초깃값이자 저장 폼
const initialState = {
  isLoggedIn: false,
  sido: {},
  gugun: { 0: '시/도를 선택하세요' },
}

export const userAction = {
  // 시도 액션
  sido: createAsyncThunk('user/sido', async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/places/sido`)
      return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }),
  // 구군 액션
  gugun: createAsyncThunk('user/gugun', async (payload, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/places/gugun/${payload}`)
      return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }),

  // 회원가입
  signUp: createAsyncThunk('user/signup', async (payload, thunkAPI) => {
    try {
      console.log(payload)
      const response = await axios.post(`${API_URL}/users`, payload)
      console.log(response)
      return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }),

  // 로그인
  login: createAsyncThunk('user/login', async (payload, thunkAPI) => {
    try {
      console.log(axios.defaults.headers.common)
      const response = await axios.post(`${API_URL}/users/login`, payload)
      console.log(response)
      return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }),

  // 내 정보 불러오기
  // myPage: createAsyncThunk('user/mypage', async (_, thunkAPI) => {
  //   try {
  //     const response = await authApi.get(`${API_URL}/users/mypage`)
  //     console.log(response)
  //     return thunkAPI.fulfillWithValue(response.data)
  //   } catch (error) {
  //     return thunkAPI.rejectWithValue(error)
  //   }
  // }),
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    logout: () => {
      sessionStorage.removeItem('refresh_token')
    },
  },
  extraReducers: {
    // 시도 성공 시 store에 저장
    [userAction.sido.fulfilled]: (state, action) => {
      state.sido = action.payload
    },
    // 구군 성공 시 store에 저장
    [userAction.gugun.fulfilled]: (state, action) => {
      state.gugun = action.payload
    },
    // 회원가입 성공 시 확인용
    [userAction.signUp.fulfilled]: (state, action) => {
      console.log(action.payload)
    },
    // 로그인 성공 시
    [userAction.login.fulfilled]: (state, action) => {
      // tokens save in session storage
      sessionStorage.setItem('access_token', action.payload['access-token'])
      sessionStorage.setItem('refresh_token', action.payload['refresh-token'])
      sessionStorage.setItem('isLoggedIn', true)
      console.log(sessionStorage.getItem('refresh_token'))
    },
  },
})

export const { logout } = userSlice.actions

export default userSlice.reducer
