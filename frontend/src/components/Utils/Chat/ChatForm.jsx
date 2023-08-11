/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useRef } from 'react'
import styled from 'styled-components'
import { IoIosSend } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import { chatAction } from '../../../store/chat'
import { ButtonContainer } from '../styled/Button'
// import useChatActions from '../hooks/useChatActions'
// import { useChat } from '../context/ChatProvider'

const MessageForm = styled.form`
  padding: 0.5vw 0;
  display: flex;
  align-items: center;
  height: 10%;
  border-top: 1px solid rgba(0, 0, 0, 0.08);

  & input {
    flex: 1;
    height: 100%;
    width: 100%;
    border: none;
  }
`

function ChatForm() {
  const dispatch = useDispatch()
  const inputRef = useRef(null)

  const sendMessage = payload => {
    if (payload) {
      dispatch(chatAction.sendChat(payload))
    }
  }

  const roomId = 1
  const userName = sessionStorage.getItem('nickname')
  const senderId = sessionStorage.getItem('userId')

  const onSubmit = e => {
    e.preventDefault()
    if (!inputRef.current.value) return

    sendMessage({
      text: inputRef.current.value,
      roomId,
      userName,
      senderId,
      type: 'TALK',
    })

    inputRef.current.value = ''
    inputRef.current.focus()
  }

  return (
    <MessageForm onSubmit={onSubmit}>
      <input type="text" placeholder="Type a message here" ref={inputRef} />
      <ButtonContainer
        flex="0"
        padding="0"
        active
        size="2.2em"
        borderRadius="50%"
      >
        <button type="submit">
          <IoIosSend fill="#fff" />
        </button>
      </ButtonContainer>
    </MessageForm>
  )
}

export default ChatForm
