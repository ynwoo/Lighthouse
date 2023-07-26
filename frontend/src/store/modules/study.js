// 이런 동작들이 있어요
const ADD = 'ADD_STUDY'
const DELETE = 'DELETE_STUDY'

// 이렇게 줄게요
const addStudy = text => {
  return {
    type: ADD,
    payload: text,
  }
}
const deleteStudy = id => {
  return {
    type: DELETE,
    payload: id,
  }
}

const studyState = {}

// state의 내부를 조작하는 전반적인 로직 (reducer)
const study = (action, state = studyState) => {
  switch (action.type) {
    case ADD:
      return [{ text: action.text, id: Date.now() }, ...state]

    case DELETE:
      return state.filter(toDo => toDo.id !== action.id)
    default:
      return state
  }
}

// 이걸로 불러주세요
export const actionCreators = {
  addStudy,
  deleteStudy,
}

export default study
