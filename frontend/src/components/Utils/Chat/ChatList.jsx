import React, { useEffect, useState } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import InfiniteScroll from 'react-infinite-scroll-component'
// import { Avatar, Divider, List, Skeleton } from 'antd'
import { Avatar, List } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { chatAction, receiveMessage } from '../../../store/chat'
import base from '../../../static/base.png'
import ChatContainer from './ChatContainer'
import { userAction } from '../../../store/user'

function ChattingList() {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [roomId, setRoomId] = useState(-1)

  const profile = useSelector(state => state.user.myProfile)
  const studiesToShow =
    profile.participatedStudies && profile.progressStudies
      ? [...profile.participatedStudies, ...profile.progressStudies].map(
          study => {
            return {
              id: study.id,
              title: study.title,
              description: study.description,
              avatar: study.badge ? study.badge.imgUrl : '',
            }
          },
        )
      : []

  const client = useSelector(state => state.chat.client)

  // console.log(messages)
  // console.log(studyId)
  useEffect(() => {
    dispatch(userAction.profile(sessionStorage.getItem('userId')))
    const sts =
      profile.participatedStudies && profile.progressStudies
        ? [...profile.participatedStudies, ...profile.progressStudies].map(
            study => {
              return {
                id: study.id,
                title: study.title,
                description: study.description,
                avatar: study.badge ? study.badge.imgUrl : '',
              }
            },
          )
        : []
    console.log('chat list user effect')
    for (let i = 0; i < sts.length; i += 1) {
      dispatch(chatAction.getChat(sts[i].id))
    }

    // dispatch(chatAction.getChat(studyId))
  }, [])

  client.onConnect = () => {
    // Do something, all subscribes must be done is this callback
    // This is needed because this will be executed after a (re)connect

    for (let i = 0; i < studiesToShow.length; i += 1) {
      console.log(`connection established sid: ${studiesToShow[i].id}`)
      client.subscribe(`/sub/${studiesToShow[i].id}`, msg => {
        const messageData = JSON.parse(msg.body)
        dispatch(receiveMessage(messageData))
      })
    }
    // client.subscribe(`/sub/${studyId}`, data => {
    //   const messageData = JSON.parse(data.body)
    //   dispatch(receiveMessage(messageData))
    // })
  }
  client.activate()

  client.onStompError = function (frame) {
    console.log(`Broker reported error: ${frame.headers.message}`)
    console.log(`Additional details: ${frame.body}`)
  }

  console.log('to show: ', studiesToShow)

  console.log('profile in chat list: ', profile)

  const clickHandler = id => {
    console.log('clicked', id)
    setRoomId(id)
  }
  const loadMoreData = () => {
    if (loading) {
      return
    }
    setLoading(true)
    fetch(
      'https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo',
    )
      .then(res => res.json())
      .then(body => {
        setData([...data, ...body.results])
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    loadMoreData()
  }, [roomId])

  console.log('env', process.env.REACT_APP_CLOUDFRONT_DOMAIN_URL)

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 500,
        overflow: 'auto',
        padding: '0 16px',
        zIndex: '99999999',
        // border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
      {roomId !== -1 ? (
        <div>
          <ChatContainer
            studyId={roomId}
            setRoomId={setRoomId}
            srcImg={
              studiesToShow.filter(s => {
                // eslint-disable-next-line eqeqeq
                return s.id == roomId
              })[0].avatar
            }
          />
        </div>
      ) : (
        <InfiniteScroll
          dataLength={data.length}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={studiesToShow}
            renderItem={item => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={
                        item.avatar
                          ? `${process.env.REACT_APP_CLOUDFRONT_DOMAIN_URL}${item.avatar}`
                          : base
                      }
                    />
                  }
                  title={
                    <button
                      type="button"
                      onClick={() => clickHandler(item.id)}
                      style={{
                        padding: '7px',
                        borderRadius: '20px',
                        backgroundColor: '#4D67C1',
                        border: '2px solid #4D67C1',
                        color: 'white',
                      }}
                    >
                      {item.title}
                    </button>
                  }
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </InfiniteScroll>
      )}
    </div>
  )
}

export default ChattingList
