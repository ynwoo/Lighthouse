import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import UserEdit from '../components/User/UserEdit'
import { userAction } from '../store/user'

export default function UserPage() {
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    const { userId } = location.state
    dispatch(userAction.profile(userId))
    dispatch(userAction.getFollowing())
  }, [location.state.userId])

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '-49px',
      }}
    >
      <UserEdit />
    </div>
  )
}
