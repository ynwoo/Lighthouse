// import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import ChatForm from './ChatForm'
import Conversation from './Conversation'
import { Description } from '../styled/Description'
import { chatAction, receiveMessage } from '../../../store/chat'

const CenterContainer = styled.div`
  display: flex;
  flex: 1;
  gap: 1.5vw;
  flex-direction: column;
  height: 100%;
  margin: auto 0;
  padding: 3vw 1vw;

  @media (max-width: 820px) {
    height: 80%;
  }
`

const Chat = styled.div`
  padding: 3vh 3vh 1.5vh 3vh;
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 80%;
  background: #fff;
  border-radius: 30px;

  @media (max-width: 820px) {
    margin: 0 2.5vw;
  }
`

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 1.1em;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding-bottom: 1em;
  height: 3.2em;

  & img {
    height: 100%;
    border-radius: 0.7em;
  }

  & h2 {
    font-size: 0.85em;
    font-weight: 600;
  }
`

function ChatContainer({ studyId, setRoomId }) {
  const dispatch = useDispatch()
  // const userInfo = useSelector(state => state.user.myInfo)
  const messages = useSelector(state => state.chat.messages)
  const client = useSelector(state => state.chat.client)

  console.log(messages)
  console.log(studyId)
  useEffect(() => {
    dispatch(chatAction.getChat(studyId))
  }, [])

  client.onConnect = frame => {
    // Do something, all subscribes must be done is this callback
    // This is needed because this will be executed after a (re)connect
    console.log(`connection established: ${frame}`)
    client.subscribe(`/sub/${studyId}`, data => {
      const messageData = JSON.parse(data.body)
      dispatch(receiveMessage(messageData))
    })
  }
  client.activate()

  client.onStompError = function (frame) {
    console.log(`Broker reported error: ${frame.headers.message}`)
    console.log(`Additional details: ${frame.body}`)
  }

  // const roomImgSrc = './aris.png'
  const roomImgSrc = `${process.env.REACT_APP_S3_DOMAIN_URL}badge/logo192_1691135473033.png`
  const roomName = '블루 아카이브 스터디 22'
  const roomDescription =
    '이 스터디는 영국에서 시작되어 5명의 사람에게 추천하지 않으면 ... '

  return (
    <CenterContainer>
      <Chat>
        <>
          <Header>
            <button type="button" onClick={setRoomId(-1)}>
              뒤로
            </button>
            <img alt="room-img" src={roomImgSrc} />

            <div>
              <h2>{roomName}</h2>
              <Description color="#000" size="0.75em">
                {roomDescription}
              </Description>
            </div>
          </Header>

          <Conversation />
          <ChatForm />
        </>
      </Chat>
    </CenterContainer>
  )
}

ChatContainer.defaultProps = {
  studyId: 1,
  setRoomId: () => {
    console.log('no setRoomId function set')
  },
}

export default ChatContainer
