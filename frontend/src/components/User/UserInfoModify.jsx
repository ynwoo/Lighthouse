import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Card,
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Row,
  Col,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { userAction } from '../../store/user'

// import { createRoot } from 'react-router-dom';
const { TextArea } = Input

// 사진 업로드 하는 것 같음
const normFile = e => {
  if (Array.isArray(e)) {
    return e
  }
  return e?.fileList
}

const dummyRequest = ({ file, onSuccess }) => {
  console.log('file upload successful', file)
  setTimeout(() => {
    onSuccess('ok')
  }, 0)
}

function UserInfoModify({ profile }) {
  // dispatch와 form을 사용하기 위한 두 줄
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  // 컴포넌트가 mount되는 과정에서 서버에 요청을 보내 store에 sido를 추가해줌
  // 저 아래에 [] 부분이 없으면 인생 끝날 때 까지 요청함
  useEffect(() => {
    dispatch(userAction.sido())
    dispatch(userAction.profile(sessionStorage.getItem('userId')))
    dispatch(userAction.myPage())
  }, [])

  // sido와 gugun을 store에서 불러 와주는 선언문
  const sido = useSelector(state => state.user.sido)
  const gugun = useSelector(state => state.user.gugun)
  const nicknameIsValid = useSelector(state => state.user.nicknameIsValid)
  // const myProfile = useSelector(state => state.user.myProfile)
  // const myInfo = useSelector(state => state.user.myInfo)
  // const profile = { ...myInfo, ...myProfile }

  // sido가 바뀔 때 마다 dispatch를 통해 redux => 서버에 요청을 보내 gugun을 갱신
  const sidoChange = e => {
    dispatch(userAction.gugun(e))
  }

  const [nicknameInput, setNickname] = useState('')

  return (
    <Card title="회원 정보 수정">
      <Form
        form={form}
        style={{ minWidth: '100px', maxWidth: '400px' }}
        name="register"
        layout="vertical"
        onFinish={values => {
          // submit버튼을 누르면 이루어지는 동작
          // 비밀번호 확인 지우기
          if (nicknameIsValid) {
            delete values.confirm
            values.userTagList = []
            values.id = Number(sessionStorage.getItem('userId'))
            // 비어있는 요소를 undefined => null로 바꾸어주는 작업
            Object.keys(values).forEach(key => {
              if (values[key] === undefined) {
                values[key] = null
              }
            })
            if (values.profileImgFile != null) {
              values.profileImgFile = values.profileImgFile[0].originFileObj
            }
            // redux => server
            dispatch(userAction.profileUpdate(values))
          } else {
            alert('닉네임 중복확인을 해주세요.')
          }
        }}
      >
        <Form.Item
          name="password"
          label="비밀번호"
          tooltip="영문/숫자/특수문자 2가지 이상 포함, 8자 이상 32자 이하 입력 (공백 제외)"
          rules={[
            {
              required: true,
              message: '비밀번호를 입력해주세요.',
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="********" />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="비밀번호 확인"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: '비밀번호가 일치하지 않습니다.',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  new Error('비밀번호가 일치하지 않습니다.'),
                )
              },
            }),
          ]}
        >
          <Input.Password placeholder="********" />
        </Form.Item>

        <Form.Item label="이름" name="name">
          <Input defaultValue={profile.name} />
        </Form.Item>

        <Form.Item
          name="nickname"
          label="닉네임"
          rules={[
            {
              type: 'text',
              message: '닉네임이 유효하지 않습니다.',
            },
          ]}
        >
          <Row>
            <Col span={19}>
              <Input
                defaultValue={profile.nickname}
                onChange={e => {
                  setNickname(e.target.value)
                }}
              />
            </Col>

            <Col span={4}>
              <Button
                style={{
                  color: 'rgb(113, 113, 113)',
                  border: '1px solid rgba(187, 187, 187, 0.3)',
                  marginLeft: '11px',
                }}
                type="button"
                onClick={() => {
                  if (nicknameInput) {
                    dispatch(userAction.checkNickname(nicknameInput))
                  }
                }}
              >
                중복확인
              </Button>
            </Col>
          </Row>
        </Form.Item>
        <p
          style={{
            color: nicknameIsValid ? 'rgb(0, 130, 255)' : 'rgb(199, 55, 55)',
          }}
        >
          {nicknameIsValid
            ? '사용 가능한 닉네임 입니다.'
            : nicknameIsValid === null
            ? ''
            : '이미 사용 중인 닉네임 입니다.'}
        </p>

        <Form.Item label="나이" name="age">
          <InputNumber defaultValue={profile.age} />
        </Form.Item>

        <Form.Item
          label="Upload"
          name="profileImgFile"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          initialValue={null}
        >
          <Upload customRequest={dummyRequest} listType="picture-card">
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item name="phoneNumber" label="전화번호">
          <Input defaultValue={profile.phoneNumber} />
        </Form.Item>

        <Form.Item label="주소(시/도)" name="sidoId">
          <Select onChange={sidoChange} initialvalue={profile.sido}>
            {/* 셀렉트에 시/도를 띄워주는 베열 메서드 */}
            {Object.keys(sido).map(key => {
              return (
                <Select.Option value={Number(key)} key={key}>
                  {sido[key]}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>

        <Form.Item label="주소(구/군)" name="gugunId">
          <Select initialvalue={profile.gugun}>
            {/* 셀렉트에 구/군을 띄워주는 배열 메서드 */}
            {Object.keys(gugun).map(key => {
              return (
                <Select.Option value={Number(key)} key={key}>
                  {gugun[key]}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>

        <Form.Item label="자기소개" name="description">
          <TextArea rows={4} defaultValue={profile.description} />
        </Form.Item>
        <div
          style={{
            display: 'flex',
            justifyContent: 'right',
            alignItems: 'right',
          }}
        >
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            저장
          </Button>
        </div>
      </Form>
    </Card>
  )
}

export default UserInfoModify
