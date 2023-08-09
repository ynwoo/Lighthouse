// import React, { useState } from 'react'
import styled from 'styled-components'
import ChatForm from './ChatForm'
import Conversation from './Conversation'
import { Description } from '../styled/Description'

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

function ChatContainer() {
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

export default ChatContainer
