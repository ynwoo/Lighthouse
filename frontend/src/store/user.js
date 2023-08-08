import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

// custom axios for axios interceptor
const authApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: 'application/json,',
  },
  withCredentials: true,
})

authApi.interceptors.request.use(config => {
  const accessToken = sessionStorage.getItem('access_token')
  const refreshToken = sessionStorage.getItem('refresh_token')

  config.headers['access-token'] = accessToken
  config.headers['refresh-token'] = refreshToken
  return config
})

authApi.interceptors.response.use(
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
        const response = await authApi.post(`${API_URL}/users/refresh`)
        console.log(response)
        const newAccessToken = response.headers['access-token']
        sessionStorage.setItem('access_token', newAccessToken)
        window.location.reload()
      } catch (error) {
        alert('로그인이 필요합니다!')
        window.location.href = '/login'
      }
      alert('로그인이 필요합니다!')
      window.location.href = '/login'
      return Promise.reject(err)
    }
    console.log('hmm...')
    alert('로그인이 필요합니다!')
    window.location.href = '/login'
    return Promise.reject(err)
  },
)
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// 이것은 초깃값이자 저장 폼
const initialState = {
  isLoggedIn: false,
  sido: {},
  gugun: { 0: '시/도를 선택하세요' },
  emailIsValid: null,
  nicknameIsValid: null,
  myInfo: {},
  userInfo: {},
  profile: {},
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

  // email 중복 확인
  // raw에 값을 주기 위한 센딩 폼
  checkEmail: createAsyncThunk('user/chekcEmail', async (payload, thunkAPI) => {
    try {
      console.log(payload)
      const response = await axios.post(
        `${API_URL}/users/check-email`,
        {
          email: payload,
        },
        {
          headers: {
            'content-type': 'application/json',
          },
        },
      )
      return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }),
  // nickname 중복 확인
  // raw에 값을 주기 위한 센딩 폼
  checkNickname: createAsyncThunk(
    'user/checkNickname',
    async (payload, thunkAPI) => {
      try {
        console.log(payload)
        const response = await axios.post(
          `${API_URL}/users/check-nickname`,
          {
            nickname: payload,
          },
          {
            headers: {
              'content-type': 'application/json',
            },
          },
        )
        return thunkAPI.fulfillWithValue(response.data)
      } catch (error) {
        return thunkAPI.rejectWithValue(error)
      }
    },
  ),

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
      const response = await axios.post(`${API_URL}/users/login`, payload)
      console.log(response)
      return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }),
  googleOauth: createAsyncThunk(
    'user/googleLogin',
    async (payload, thunkAPI) => {
      try {
        const response = await axios.post(
          `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=http://i9a409.p.ssafy.io:8081/auth/callback/google&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email`,
        )
        console.log(response)
        return thunkAPI.fulfillWithValue(response.data)
      } catch (error) {
        return thunkAPI.rejectWithValue(error)
      }
    },
  ),
  // 로그아웃
  logout: createAsyncThunk('user/logout', async (_, thunkAPI) => {
    try {
      const response = await authApi.get(`/users/logout`)
      console.log(response)
      return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }),
  // 내 정보 불러오기
  myPage: createAsyncThunk('user/mypage', async (_, thunkAPI) => {
    try {
      const response = await authApi.get(`/users/mypage`)
      console.log(response)
      return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }),

  // 프로필 불러오기
  profile: createAsyncThunk('user/profile', async (payload, thunkAPI) => {
    try {
      const response = await authApi.get(`${API_URL}/users/${payload}`)
      console.log(response)
      return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }),
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
    // email 중복 체크 시 결과 저장
    [userAction.checkEmail.fulfilled]: (state, action) => {
      console.log(action.payload.available)
      state.emailIsValid = action.payload.available
    },
    // nickname 중복 체크 시 결과 저장
    [userAction.checkNickname.fulfilled]: (state, action) => {
      console.log(action.payload.available)
      state.nicknameIsValid = action.payload.available
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
      sessionStorage.setItem('id', action.payload['user-id'])
      console.log(sessionStorage.getItem('refresh_token'))
    },
    // 로그아웃 성공 시 토큰 삭제
    [userAction.logout.fulfilled]: (state, action) => {
      // tokens save in session storage
      sessionStorage.removeItem('access_token', action.payload['access-token'])
      sessionStorage.removeItem(
        'refresh_token',
        action.payload['refresh-token'],
      )
      sessionStorage.removeItem('isLoggedIn', true)
    },
    // 마이페이지
    [userAction.myPage.fulfilled]: (state, action) => {
      console.log(action.payload.userInfo)
      state.myInfo = action.payload.userInfo
    },
    // 마이페이지
    [userAction.profile.fulfilled]: (state, action) => {
      console.log(action.payload)
      state.profile = action.payload
    },
  },
})

export const { logout } = userSlice.actions

export default userSlice.reducer
