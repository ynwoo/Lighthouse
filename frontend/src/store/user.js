import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

const initialState = {
  data: [],
}

export const userAction = {
  test: createAsyncThunk('TEST', async (payload, thunkAPI) => {
    try {
      console.log('arg', payload)
      const response = await axios.get(`${API_URL}/places/sido`)
      console.log('response', response)
      return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
      console.log('안돼')
      return thunkAPI.rejectWithValue(error)
    }
  }),
  signUp: createAsyncThunk('SIGNUP', async (arg, thunkAPI) => {
    try {
      console.log('URL', API_URL)
      console.log('arg', arg)
      const response = await axios.post(`${API_URL}/users/join`, arg)
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
  extraReducers: {
    [userAction.test.fulfilled]: (state, action) => {
      state.value.push(action.payload)
    },
    [userAction.signUp.fulfilled]: (state, action) => {
      state.value.push(action.payload)
    },
  },
})

export default userSlice.reducer
