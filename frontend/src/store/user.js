import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

const initialState = {
  token: {
    refreshToken: '',
    accessTpken: '',
  },
  signUpData: {
    email: 'ssafy@example.com',
    password: 'secure_password',
    name: 'fox',
    nickName: 'foxfox',
    profileImgUrl: null,
    age: 5,
    sidoId: 1,
    gugunId: 1,
    phoneNumber: '010-1234-5678',
    description: '안녕하세요 김싸피 입니다.',
    userTagList: [3, 4, 7], // 자격증, 알고리즘, CS
  },
  sido: [],
  gugun: [],
}

export const userAction = {
  // 테스트 액션
  test: createAsyncThunk('TEST', async (payload, thunkAPI) => {
    try {
      console.log('payload', payload)
      const response = await axios.get(`${API_URL}/tags`)
      console.log('response', response)
      return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
      console.log('안돼')
      return thunkAPI.rejectWithValue(error)
    }
  }),

  // 회원가입
  signUpFin: createAsyncThunk('SIGNUPFIN', async (payload, thunkAPI) => {
    try {
      console.log('URL', API_URL)
      console.log('payload', payload)
      const response = await axios.post(`${API_URL}/users`, {
        email: 'ssafy@example.com',
        password: 'secure_password',
        name: 'fox',
        nickName: 'foxfox',
        profileImgUrl: null,
        age: 5,
        sidoId: 1,
        gugunId: 1,
        phoneNumber: '010-1234-5678',
        description: '안녕하세요 김싸피 입니다.',
        userTagList: [3, 4, 7],
      })
      console.log('response', response)
      return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }),

  // 로그인
  login: createAsyncThunk('LOGIN', async (payload, thunkAPI) => {
    try {
      console.log('URL', API_URL)
      console.log('payload', payload)
      const response = await axios({
        method: 'post',
        url: '/users/login',
        baseURL: API_URL,
        data: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      })
      console.log('response', response)
      return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }),
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signUp: (state, action) => {
      console.log(action.payload)
      state.signUpData = action.payload
      console.log(state.signUpData)
    },
  },
  extraReducers: {
    [userAction.test.fulfilled]: (state, action) => {
      state.sido.push(action.payload)
    },
    [userAction.signUpFin.fulfilled]: (state, action) => {
      state.sido.push(action.payload)
    },
    [userAction.login.fulfilled]: (state, action) => {
      console.log(action.payload)
      state.token.refreshToken = action.payload
    },
  },
})

export const { signUp } = userSlice.actions

export default userSlice.reducer
