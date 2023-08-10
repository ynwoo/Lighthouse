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
  },
  studies: [],
  studyDetail: [],
  tags: [],
}

export const studyAction = {
  studyList: createAsyncThunk('study/list', async (payload, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/study`, { params: payload })
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
  },
  extraReducers: {
    [studyAction.studyList.fulfilled]: (state, action) => {
      state.studies = action.payload.content
    },
    [studyAction.studyDetail.fulfilled]: (state, action) => {
      state.studyDetail = action.payload
    },
    [studyAction.getTags.fulfilled]: (state, action) => {
      console.log(action.payload.tagList)
      state.tags = action.payload.tagList
      localStorage.setItem('tags', JSON.stringify(action.payload.tagList))
    },
  },
})

export const { setText, setOnline } = studySlice.actions

export default studySlice.reducer
