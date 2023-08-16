import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { Client } from '@stomp/stompjs'

const API_URL = process.env.REACT_APP_API_URL

const initialState = {
  messages: [],
  client: new Client({
    brokerURL: `ws://i9a409.p.ssafy.io:8082/ws/chat`,
    connectHeaders: {
      login: `${sessionStorage.getItem('userId')}`,
      passcode: 'password',
    },
    debug(callbackLog) {
      console.log(`connection:  ${callbackLog}`)
    },
    reconnectDelay: 5000, // 자동 재 연결
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  }),
}
export const chatAction = {
  getChat: createAsyncThunk('chat/get', async (payload, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/kafka/${payload}`)
      return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }),
  sendChat: createAsyncThunk('chat/send', async (payload, thunkAPI) => {
    try {
      const response = await axios
        .post(`http://i9a409.p.ssafy.io:8081/kafka/publish`, {
          type: payload.type,
          roomId: payload.roomId,
          senderId: payload.senderId,
          senderName: payload.userName,
          message: payload.text,
        })
        .then(console.log('payload 발송 성공 +=> \n', payload))
      return thunkAPI.fulfillWithValue(response.data)
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }),
  connectSocket: createAsyncThunk('chat/connect', async (payload, thunkAPI) => {
    try {
      const client = new Client({
        brokerURL: `ws://i9a409.p.ssafy.io:8082/ws/chat`,
        connectHeaders: {
          login: 'user',
          passcode: 'password',
        },
        debug(callbackLog) {
          console.log(`connection: ${payload}  ${callbackLog}`)
        },
        reconnectDelay: 5000, // 자동 재 연결
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      })

      return client
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }

    // client.onConnect = function (frame) {
    //   console.log('Connected: ' + frame)
    //   client.subscribe('/topic/public', function (message) {
    //     console.log(message.body)
    //     thunkAPI.dispatch(receiveMessage(message.body))
    //   })
    // }
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
  extraReducers: {
    [chatAction.getChat.fulfilled]: (state, action) => {
      console.log(action.payload.log)
      state.messages = [...state.messages, ...action.payload.log]
      console.log(state.messages)
      // state.messages = action.payload.log
    },
  },
})

export const { receiveMessage } = chatSlice.actions
export default chatSlice.reducer
