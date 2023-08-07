import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  messages: [],
}
export const chatAction = {
  sendChat: createAsyncThunk('chat/send', async (payload, thunkAPI) => {
    try {
      const response = await axios
        .post(`http://i9a409.p.ssafy.io:8081/kafka/publish`, {
          type: 'TALK',
          roomId: '1',
          senderId: '777',
          senderName: 'shin',
          message: payload,
        })
        .then(console.log('발송 성공'))
      return thunkAPI.fulfillWithValue(response.data)
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }),
}
export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    receiveMessage: (state, action) => {
      console.log('받았다')
      state.messages.push(action.payload)
    },
  },
  extraReducers: {},
})

export const { receiveMessage } = chatSlice.actions
export default chatSlice.reducer
