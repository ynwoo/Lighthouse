import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import StudyList from '../components/Study/StudyList'
import SearchComponent from '../components/Utils/SearchComponent'
import { userAction } from '../store/user'

export default function MyStudiesPage() {
  const dispatch = useDispatch()
  const location = useLocation()
  const userId = Number(location.state.userId)
  useEffect(() => {
    dispatch(userAction.profile(userId))
    dispatch(userAction.myPage())
    dispatch(userAction.getFollowing())
  }, [userId])

  const profile = useSelector(state => state.user.profile)

  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>내 스터디</h2>
      <SearchComponent />
      <StudyList
        studies={[...profile.progressStudies, ...profile.recruitingStudies]}
      />
    </div>
  )
}
