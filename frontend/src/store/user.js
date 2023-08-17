import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { formInstance } from '../api/index'

const formApi = formInstance()

const API_URL = process.env.REACT_APP_API_URL

// custom axios for axios interceptor
export const authApi = axios.create({
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
        const newAccessToken = response.data['access-token']
        sessionStorage.setItem('access_token', newAccessToken)
        window.location.reload()
      } catch (error) {
        alert('로그인이 필요합니다!')
        window.location.href = '/login'
      }
      return Promise.reject(err)
    }
    console.log('else')
    return Promise.reject(err)
  },
)
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// 이것은 초깃값이자 저장 폼
const initialState = {
  isLoggedIn: false,
  sido: [],
  gugun: [],
  emailIsValid: null,
  nicknameIsValid: null,
  myInfo: {},
  myProfile: {
    id: 0,
    isValid: 0,
    nickname: '',
    profileImgUrl: '',
    description: '',
    tags: [],
    participatedStudies: [],
    recruitingStudies: [],
    progressStudies: [],
    terminatedStudies: [],
    bookmarkStudies: [],
    badges: [],
    score: 0,
    following: 0,
    follower: 0,
    simpleUserResponse: {},
    participatedUserProfiles: [],
  },
  profile: {
    id: 0,
    isValid: 0,
    nickname: '',
    profileImgUrl: '',
    description: '',
    tags: [],
    participatedStudies: [],
    recruitingStudies: [],
    progressStudies: [],
    terminatedStudies: [],
    bookmarkStudies: [],
    badges: [],
    score: 0,
    following: 0,
    follower: 0,
    simpleUserResponse: {},
    participatedUserProfiles: [],
  },
  following: null,
  userInfo: {},
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
        console.log(response)
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
      const response = await formApi.post(`${API_URL}/users`, payload)
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
      const response = await authApi.get(`${API_URL}/users/profile/${payload}`)
      console.log('getProfile : ', response)
      return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }),
  // 프로필 업데이트
  profileUpdate: createAsyncThunk(
    'user/profileUpdate',
    async (payload, thunkAPI) => {
      try {
        const response = await authApi.put(`${API_URL}/users/update`, payload, {
          headers: { 'content-type': 'multipart/form-data' },
        })
        console.log(response)
        return thunkAPI.fulfillWithValue(response.data)
      } catch (error) {
        return thunkAPI.rejectWithValue(error)
      }
    },
  ),
  // 나의 팔로우 목록
  getFollowing: createAsyncThunk(
    'user/getFollow',
    async (payload, thunkAPI) => {
      try {
        const response = await authApi.get(`${API_URL}/users/follow`)
        console.log(response)
        return thunkAPI.fulfillWithValue(response.data)
      } catch (error) {
        return thunkAPI.rejectWithValue(error)
      }
    },
  ),
  follow: createAsyncThunk('user/follow', async (payload, thunkAPI) => {
    try {
      const response = await authApi.post(`/users/follow/${payload}`)
      console.log(response)
      return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }),
  unfollow: createAsyncThunk('user/unfollow', async (payload, thunkAPI) => {
    try {
      const response = await authApi.delete(`/users/follow/${payload}`)
      console.log(response)
      return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }),
  userReview: createAsyncThunk('user/userReview', async (payload, thunkAPI) => {
    try {
      const response = await authApi.post(`/users/eval`, payload)
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
    [userAction.checkEmail.rejected]: (state, action) => {
      console.log(action.payload.available)
      state.emailIsValid = action.payload.available
    },
    // nickname 중복 체크 시 결과 저장
    [userAction.checkNickname.fulfilled]: (state, action) => {
      console.log(action.payload.available)
      state.nicknameIsValid = action.payload.available
    },
    [userAction.checkNickname.rejected]: (state, action) => {
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
      sessionStorage.setItem('userId', action.payload['user-id'])
      sessionStorage.setItem('nickname', action.payload.nickname)
      console.log('action.payload', action.payload)
      state.isLoggedIn = true
      state.userInfo = action.payload.userInfo
      console.log(action.payload.userInfo)
      console.log(sessionStorage.getItem('refresh_token'))
    },
    // 로그아웃 성공 시 토큰 삭제
    [userAction.logout.fulfilled]: state => {
      // tokens save in session storage
      sessionStorage.clear()
      state.isLoggedIn = false
    },
    // 마이페이지
    [userAction.myPage.fulfilled]: (state, action) => {
      console.log(action.payload.userInfo)
      state.myInfo = action.payload.userInfo
    },
    // 프로필
    [userAction.profile.fulfilled]: (state, action) => {
      console.log(action.payload.id)
      if (action.payload.id === Number(sessionStorage.getItem('userId'))) {
        state.myProfile = action.payload
        state.profile = action.payload
      } else {
        state.profile = action.payload
      }
    },
    // 팔로우
    [userAction.getFollowing.fulfilled]: (state, action) => {
      console.log(action.payload)
      state.following = action.payload
    },
  },
})

export const { logout } = userSlice.actions

export default userSlice.reducer
