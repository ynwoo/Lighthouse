import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

const initialState = {
  params: {
    status: 1,
    page: 0,
    key: 'title',
    word: '',
  },
  studies: [],
  studyDetail: null,
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
  },
  extraReducers: {
    [studyAction.studyList.fulfilled]: (state, action) => {
      state.studies = action.payload.content
    },
  },
})

export const { setText } = studySlice.actions

export default studySlice.reducer
