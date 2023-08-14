import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Card, Avatar, Button, Row, Col, Tabs } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { userAction } from '../../store/user'

import StudyList from '../Study/StudyList'
import UserInfo from './UserInfo'
import UserInfoModify from './UserInfoModify'
import { profileImage } from '../../utils/image'

const { Content, Sider } = Layout

export default function UserEdit() {
  const dispatch = useDispatch()
  const userId = Number(window.location.pathname.split('/user_edit/')[1])
  const loginId = Number(sessionStorage.getItem('userId'))
  useEffect(() => {
    dispatch(userAction.profile(userId))
    dispatch(userAction.myPage())
  }, [])
  const profile = useSelector(state => state.user.myProfile)
  const myInfo = useSelector(state => state.user.myInfo)
  const myProfile = { ...myInfo, ...profile }

  let items = [
    {
      key: '1',
      label: `정보`,
      children: <UserInfo profile={profile} />,
    },
    {
      key: '4',
      label: `참여중인 스터디`,
      children: (
        <StudyList
          studies={[...profile.progressStudies, ...profile.recruitingStudies]}
        />
      ),
    },
    {
      key: '5',
      label: `완료한 스터디`,
      children: <StudyList studies={profile.terminatedStudies} />,
    },
    {
      key: '6',
      label: `북마크 스터디`,
      children: <StudyList studies={profile.bookmarkStudies} />,
    },
  ]
  if (userId === loginId) {
    items = [
      ...items,
      {
        key: '2',
        label: `생성중인 스터디`,
        children: (
          <StudyList
            studies={profile.participatedStudies?.filter(
              study => study.leaderProfile.id === userId,
            )}
          />
        ),
      },
      {
        key: '3',
        label: `신청한 스터디`,
        children: (
          <StudyList
            studies={profile.participatedStudies?.filter(
              study => study.leaderProfile.id !== userId,
            )}
          />
        ),
      },
      {
        key: '7',
        label: `프로필 수정`,
        children: <UserInfoModify profile={myProfile} />,
      },
    ].sort((a, b) => a.key - b.key)
  }

  return (
    <Layout
      style={{
        padding: '3vh 10vw',
        background: 'rgb(255, 255, 255)',
      }}
    >
      <Sider
        style={{
          background: 'rgb(255, 255, 255)',
        }}
        width={200}
      >
        <Card bordered={false}>
          <Avatar
            size={{ sm: 100, md: 150, lg: 150, xl: 150, xxl: 150 }}
            src={profileImage(profile.profileImgUrl)}
            shape="circle"
          />
          <h3 style={{ marginBottom: '0px' }}>
            {profile.nickname}님의 페이지 입니다
          </h3>
          {/* {userId === loginId && <p>유저 이름</p>} */}
          <Button block style={{ margin: '2vh 0' }}>
            팔로우
          </Button>
          <Row>
            <Col span={12} align="middle">
              <Link to="/">{profile.follower} 팔로워</Link>
            </Col>
            <Col span={12} align="middle">
              <Link to="/">{profile.following} 팔로잉</Link>
            </Col>
          </Row>
        </Card>
      </Sider>
      <Content
        style={{
          padding: '0 24px',
          minHeight: 280,
        }}
      >
        <Tabs defaultActiveKey="1" items={items} />
      </Content>
    </Layout>
  )
}
