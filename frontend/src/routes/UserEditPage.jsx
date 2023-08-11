import React from 'react'
import { useDispatch } from 'react-redux'
import { userAction } from '../store/user'
import UserEdit from '../components/User/UserEdit'

export default function UserPage() {
  const dispatch = useDispatch()

  const userId = sessionStorage.getItem('userId')
  dispatch(userAction.myPage(userId))
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        // backgroundImage: 'linear-gradient(to bottom, #74A3FF, #FFFFFF 25%)',
        marginTop: '-49px',
      }}
    >
      <UserEdit />
    </div>
  )
}
