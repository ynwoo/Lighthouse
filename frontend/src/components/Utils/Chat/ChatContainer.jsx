import styled from 'styled-components'
import ChatForm from './ChatForm'
import Conversation from './Conversation'
import { Description } from '../styled/Description'
import backLogo from '../../../static/arrow.png'
import base from '../../../static/base.png'

const CenterContainer = styled.div`
  display: flex;
  flex: 1;
  gap: 1.5vw;
  flex-direction: column;
  height: 100%;
  margin: auto 0;

  @media (max-width: 820px) {
    height: 80%;
  }
`

const Chat = styled.div`
  padding: 0vh 3vh 1.5vh 3vh;
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
  padding-right: 30px;
  width: 320px;
  gap: 1.1em;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  background-color: white;
  padding-bottom: 1em;
  padding-top: 20px;
  height: 60px;
  position: fixed;
  z-index: 9999999999;

  & img {
    height: 100%;
    border-radius: 0.7em;
  }

  & h2 {
    font-size: 0.85em;
    font-weight: 600;
  }
`

function ChatContainer({ studyId, setRoomId, studyInfo }) {
  console.log('sudy info', studyInfo)
  const roomName = studyInfo.title
  const roomDescription = studyInfo.description

  return (
    <CenterContainer>
      <Chat>
        <div>
          <Header>
            <button
              type="button"
              onClick={() => setRoomId(-1)}
              style={{
                padding: '7px',
                height: '60px',
                backgroundColor: 'white',
                border: 'none',
              }}
            >
              {/* <h1>🔙</h1> */}
              <img
                src={backLogo}
                alt="응애"
                style={{ width: '20px', height: '20px' }}
              />
            </button>
            <img
              alt="room-img"
              src={
                studyInfo.avatar
                  ? `${process.env.REACT_APP_CLOUDFRONT_DOMAIN_URL}${studyInfo.avatar}`
                  : base
              }
            />

            <div>
              <h2>{roomName}</h2>
              <Description color="#000" size="0.75em">
                {roomDescription}
              </Description>
            </div>
          </Header>
          <div style={{ marginTop: '70px' }}>
            <Conversation roomId={studyId} />
            <ChatForm roomId={studyId} />
          </div>
        </div>
      </Chat>
    </CenterContainer>
  )
}

ChatContainer.defaultProps = {
  studyId: 1,
  setRoomId: () => {
    console.log('no setRoomId function set')
  },
  srcImg: '',
}

export default ChatContainer
