import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

// 이것은 초깃값이자 저장 폼
const initialState = {
  accessToken: '',
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
      return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }),

  // 로그인
  login: createAsyncThunk('LOGIN', async (payload, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/users/login`, payload)
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
    loginCheck: state => {
      if (sessionStorage.getItem('refresh_token')) {
        state.isLoggedIn = true
      }
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
      // access token save in store
      state.accessToken = action.payload['access-token']
      // refresh token save in session storage
      sessionStorage.setItem('refresh_token', action.payload['refresh-token'])
      state.isLoggedIn = true
      console.log(sessionStorage.getItem('refresh_token'))
    },
  },
})

export const { logout, loginCheck } = userSlice.actions

export default userSlice.reducer
