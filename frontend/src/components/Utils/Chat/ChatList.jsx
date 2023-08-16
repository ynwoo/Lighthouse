import React, { useEffect, useState } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import InfiniteScroll from 'react-infinite-scroll-component'
// import { Avatar, Divider, List, Skeleton } from 'antd'
import { Avatar, List } from 'antd'

import { useSelector } from 'react-redux'
import ChatContainer from './ChatContainer'

function ChattingList() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [roomId, setRoomId] = useState(-1)

  const profile = useSelector(state => state.user.profile)
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

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 500,
        overflow: 'auto',
        padding: '0 16px',
        // border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
      {roomId !== -1 ? (
        <div>
          <ChatContainer studyId={roomId} setRoomId={setRoomId} />
        </div>
      ) : (
        <InfiniteScroll
          dataLength={data.length}
          // next={loadMoreData}
          // hasMore={data.length < 50}
          // loader={
          //   <Skeleton
          //     avatar
          //     paragraph={{
          //       rows: 1,
          //     }}
          //     active
          //   />
          // }
          // endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={studiesToShow}
            renderItem={item => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={`${process.env.REACT_APP_S3_DOMAIN_URL}${item.avatar}`}
                    />
                  }
                  title={
                    <button type="button" onClick={() => clickHandler(item.id)}>
                      {item.title}
                    </button>
                  }
                  description={item.description}
                />
                <div>GO</div>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      )}
    </div>
  )
}

export default ChattingList
