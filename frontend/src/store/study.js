import { createSlice } from '@reduxjs/toolkit'

const initialStateValue = ''

export const studySlice = createSlice({
  name: 'study',
  initialState: { value: initialStateValue },
  reducers: {
    setText: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setText } = studySlice.actions

export default studySlice.reducer
