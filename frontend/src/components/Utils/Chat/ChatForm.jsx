/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useRef } from 'react'
import styled from 'styled-components'
import { IoIosSend } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import { chatAction } from '../../../store/chat'
import { ButtonContainer } from '../styled/Button'

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

function ChatForm({ roomId }) {
  const dispatch = useDispatch()
  const inputRef = useRef(null)

  const sendMessage = payload => {
    if (payload) {
      dispatch(chatAction.sendChat(payload))
    }
  }

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

ChatForm.defaultProps = {
  roomId: 1,
}

export default ChatForm
