// 액션
const SIGNUP = 'user/SIGNUP'
const LOGIN = 'user/LOGIN'

// 액션 함수
const signUp = () => ({
  type: SIGNUP,
})
const logIn = () => ({
  type: LOGIN,
})

const userState = []

// state의 내부를 조작하는 전반적인 로직 (reducer)
const user = (action, state = userState) => {
  switch (action.type) {
    case SIGNUP:
      return [{ text: action.text, id: Date.now() }, ...state]

    case LOGIN:
      return state
    default:
      return state
  }
}

// 이걸로 불러주세요
export const actionCreators = {
  signUp,
  logIn,
}

export default user
