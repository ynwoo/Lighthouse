import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
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
  const location = useLocation()
  const userId = Number(location.state.userId)
  // const userId = Number(window.location.pathname.split('/user_edit/')[1])
  const loginId = Number(sessionStorage.getItem('userId'))
  useEffect(() => {
    console.log(userId)
    dispatch(userAction.profile(userId))
    dispatch(userAction.myPage())
    dispatch(userAction.getFollowing())
  }, [userId])
  const profile = useSelector(state => state.user.profile)
  const myInfo = useSelector(state => state.user.myInfo)
  const following = useSelector(state => state.user.following)
  const myProfile = { ...myInfo, ...profile }

  const [score, setScore] = useState(0)

  console.log(
    'profile.participatedUserProfiles',
    profile.participatedUserProfiles['27'],
  )

  let items = [
    {
      key: '1',
      label: `정보`,
      children: <UserInfo profile={profile} />,
    },
    {
      key: '5',
      label: `참여 중인 스터디`,
      children: (
        <StudyList
          studies={[...profile.progressStudies, ...profile.recruitingStudies]}
        />
      ),
    },
    {
      key: '6',
      label: `완료한 스터디`,
      children: <StudyList studies={profile.terminatedStudies} />,
    },
    {
      key: '7',
      label: `북마크한 스터디`,
      children: <StudyList studies={profile.bookmarkStudies} />,
    },
  ]
  if (userId === loginId) {
    items = [
      ...items,
      {
        key: '2',
        label: `신청 명단`,
        children: (
          <div>
            {Object.keys(profile.participatedUserProfiles).map(studyId => (
              <div>
                {studyId}:
                {profile.participatedUserProfiles[`${studyId}`].map(
                  userProfile => (
                    <Sider
                      style={{
                        background: 'rgb(255, 255, 255)',
                      }}
                      width={200}
                    >
                      <Card bordered={false}>
                        <Avatar
                          size={{
                            sm: 100,
                            md: 150,
                            lg: 150,
                            xl: 150,
                            xxl: 150,
                          }}
                          src={profileImage(userProfile.profileImgUrl)}
                          shape="circle"
                        />
                        <h3 style={{ marginBottom: '0px' }}>
                          {userProfile.nickname}
                        </h3>
                        <p>님의 페이지 입니다.</p>
                      </Card>
                    </Sider>
                  ),
                )}
              </div>
            ))}
          </div>
          // <StudyList
          //   studies={profile.participatedStudies?.filter(
          //     study => study.leaderProfile.id === userId,
          //   )}
          // />
        ),
      },
      {
        key: '3',
        label: `수정 중인 스터디`,
        children: (
          <StudyList
            studies={profile.participatedStudies?.filter(
              study => study.leaderProfile.id === userId,
            )}
          />
        ),
      },
      {
        key: '4',
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
        key: '8',
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
          <h3 style={{ marginBottom: '0px' }}>{profile.nickname}</h3>
          <p>님의 페이지 입니다.</p>
          {/* {userId === loginId && <p>유저 이름</p>} */}
          {/* 버튼 렌더링 */}
          {profile.id === myInfo.id ? (
            <br />
          ) : !following?.find(id => id === profile.id) ? (
            <Button
              type="primary"
              block
              style={{ margin: '2vh 0' }}
              onClick={() => {
                dispatch(userAction.follow(profile.id)).then(() => {
                  dispatch(userAction.getFollowing())
                  dispatch(userAction.profile(profile.id))
                })
                // window.location.reload()
              }}
            >
              팔로우
            </Button>
          ) : (
            <Button
              type="default"
              block
              style={{ margin: '2vh 0' }}
              onClick={() => {
                dispatch(userAction.unfollow(profile.id)).then(() => {
                  dispatch(userAction.getFollowing())
                  dispatch(userAction.profile(profile.id))
                })
              }}
            >
              언팔로우
            </Button>
          )}
          {profile.id === myInfo.id ? (
            <br />
          ) : (
            <>
              <input
                type="number"
                value={score}
                onChange={e => setScore(e.target.value)}
              />
              <Button
                type="submit"
                onClick={() => {
                  const data = {
                    userId: profile.id,
                    score,
                  }
                  dispatch(userAction.userReview(data))
                    .unwrap()
                    .then(() => {
                      alert('리뷰 등록이 완료되었습니다!')
                      dispatch(userAction.profile(userId))
                    })
                    .catch(res => {
                      if (res.response.status === 404) {
                        alert('리뷰는 한 개만 작성 가능합니다!')
                      }
                    })
                }}
              >
                review!
              </Button>
            </>
          )}
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
