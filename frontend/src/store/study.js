import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { authApi } from './user'

const API_URL = process.env.REACT_APP_API_URL

const initialState = {
  params: {
    status: 1,
    page: 0,
    key: 'title',
    word: '',
    isOnline: 0,
    orderKey: 'like',
    orderBy: 'desc',
    tagIds: [],
  },
  studies: [],
  totalPage: 0,
  studyDetail: [],
  tags: [],
}

export const studyAction = {
  studyList: createAsyncThunk('study/list', async (payload, thunkAPI) => {
    try {
      const options = payload
      console.log('payload : ', payload)
      let uri = '/study?'
      Object.keys(options).forEach((option, index) => {
        if (option === 'tagIds') {
          if (!option.length) {
            console.log('tag', options[option])
            options[option]?.forEach(tagId => {
              uri += `${option}=${tagId}`
            })
            uri += '&'
          }
        } else {
          if (index !== 0) uri += '&'
          uri += `${option}=${options[option]}`
        }
      })
      console.log(uri)
      const response = await axios.get(`${API_URL}${uri}`)
      return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }),
  studyDetail: createAsyncThunk('study/detail', async (payload, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/study/${payload}`)
      return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }),
  // 태그 리스트
  getTags: createAsyncThunk('study/getTags', async (payload, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/tags`)
      return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }),
  joinStudy: createAsyncThunk('study/joinStudy', async (payload, thunkAPI) => {
    try {
      const response = await authApi.post(
        `${API_URL}/participation-history/${payload}`,
      )
      console.log(response)
      return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }),
  like: createAsyncThunk('study/like', async (payload, thunkAPI) => {
    try {
      const response = await authApi.post(`${API_URL}/study/like/${payload}`)
      console.log(response)
      return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }),
  bookmark: createAsyncThunk('study/bookmark', async (payload, thunkAPI) => {
    try {
      const response = await authApi.post(
        `${API_URL}/study/bookmark/${payload}`,
      )
      console.log(response)
      return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }),
}

export const studySlice = createSlice({
  name: 'study',
  initialState,
  reducers: {
    setText: (state, action) => {
      if (action.payload === null) {
        action.payload = ''
      }
      state.params.word = action.payload
    },
    setOnline: (state, action) => {
      console.log(action.payload)
      if (state.params.isOnline) {
        state.params.isOnline = 0
      } else {
        state.params.isOnline = 1
      }
    },
    setParams: (state, action) => {
      state.params = action.payload
      console.log('setParams', action.payload, state.params)
    },
  },
  extraReducers: {
    [studyAction.studyList.fulfilled]: (state, action) => {
      state.studies = action.payload.content
      state.totalPage = action.payload.totalPages - 1
    },
    [studyAction.studyDetail.fulfilled]: (state, action) => {
      // state.studyDetail.push(action.payload)
      state.studyDetail = action.payload
    },
    [studyAction.getTags.fulfilled]: (state, action) => {
      console.log(action.payload.tagList)
      state.tags = action.payload.tagList
      localStorage.setItem('tags', JSON.stringify(action.payload.tagList))
    },
    [studyAction.like.fulfilled]: () => {
      alert('따봉')
    },
    [studyAction.bookmark.fulfilled]: () => {
      alert('북마크')
    },
    [studyAction.joinStudy.rejected]: () => {
      alert('이미 가입된 스터디입니다!')
    },
  },
})

export const { setText, setOnline, setParams } = studySlice.actions

export default studySlice.reducer
