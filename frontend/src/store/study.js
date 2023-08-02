import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  myStudy: [],
  studys: [],
}
export const studySlice = createSlice({
  name: 'study',
  initialState,
  reducers: {
    setText: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setText } = studySlice.actions

export default studySlice.reducer
