import { legacy_createStore as createStore } from 'redux'
// 이런 동작들이 있어요
const SEARCH = 'SEARCH'

// 이렇게 줄게요
const searchStudy = text => {
  return {
    type: SEARCH,
    text,
  }
}

const studyState = { text: '' }

// state의 내부를 조작하는 전반적인 로직 (reducer)
const reducer = (state = studyState, action) => {
  switch (action.type) {
    case SEARCH:
      return action.text
    default:
      return state.text
  }
}

const study = createStore(reducer)

// 이걸로 불러주세요
export const actionCreators = {
  searchStudy,
}

export default study
