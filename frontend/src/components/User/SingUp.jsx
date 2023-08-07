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
  Typography,
  Row,
  Col,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { userAction } from '../../store/user'

// import { createRoot } from 'react-router-dom';
const { Title } = Typography
const { TextArea } = Input

// 사진 업로드 하는 것 같음
const normFile = e => {
  if (Array.isArray(e)) {
    return e
  }
  return e?.fileList
}

//

function SignUp() {
  // dispatch와 form을 사용하기 위한 두 줄
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  // 컴포넌트가 mount되는 과정에서 서버에 요청을 보내 store에 sido를 추가해줌
  // 저 아래에 [dispatch] 부분이 없으면 인생 끝날 때 까지 요청함
  useEffect(() => {
    dispatch(userAction.sido())
  }, [dispatch])

  // sido와 gugun을 store에서 불러 와주는 선언문
  const sido = useSelector(state => state.user.sido)
  const gugun = useSelector(state => state.user.gugun)
  const emailIsValid = useSelector(state => state.user.emailIsValid)
  const nicknameIsValid = useSelector(state => state.user.nicknameIsValid)

  // sido가 바뀔 때 마다 dispatch를 통해 redux => 서버에 요청을 보내 gugun을 갱신
  const sidoChange = e => {
    dispatch(userAction.gugun(e))
  }

  const [emailInput, setEmail] = useState('')
  const [nicknameInput, setNickname] = useState('')

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // height: '100vh',
      }}
    >
      <Card style={{ width: 500 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '5vh',
          }}
        >
          <Title level={2}>회원가입 </Title>
        </div>
        <Form
          form={form}
          name="register"
          layout="vertical"
          onFinish={value => {
            // submit버튼을 누르면 이루어지는 동작
            // 비밀번호 확인 지우기
            delete value.confirm
            value.userTagList = []
            // 비어있는 요소를 undefined => null로 바꾸어주는 작업
            Object.keys(value).forEach(key => {
              if (value[key] === undefined) {
                value[key] = null
              }
            })
            // redux => server
            dispatch(userAction.signUp(value))
          }}
        >
          <Form.Item
            name="email"
            label="이메일"
            rules={[
              {
                type: 'email',
                message: '이메일 형식이 올바르지 않습니다.',
              },
              {
                required: true,
                message: '이메일 형식이 올바르지 않습니다.',
              },
            ]}
          >
            <Row>
              <Col span={19}>
                <Input
                  onChange={e => {
                    setEmail(e.target.value)
                  }}
                  placeholder="example@lighthouse.com"
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
                    if (emailInput) {
                      dispatch(userAction.checkEmail(emailInput))
                    }
                  }}
                >
                  중복확인
                </Button>
              </Col>
            </Row>
          </Form.Item>

          <p>
            {emailIsValid
              ? '사용 가능한 이메일 입니다!'
              : emailIsValid === null
              ? ''
              : '중복된 이메일입니다!'}
          </p>

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
            <Input />
          </Form.Item>

          <Form.Item
            name="nickname"
            label="닉네임"
            rules={[
              {
                type: 'text',
                message: '닉네임이 유효하지 않습니다.',
              },
              {
                required: true,
                message: '닉네임을 작성해주세요 !',
              },
            ]}
          >
            <Row>
              <Col span={19}>
                <Input
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
          <p>
            {nicknameIsValid
              ? '사용 가능한 닉네임 입니다!'
              : nicknameIsValid === null
              ? ''
              : '중복된 닉네임입니다!'}
          </p>

          <Form.Item label="나이" name="age">
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="Upload"
            name="프로필 사진"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            initialValue={null}
          >
            <Upload action="/upload.do" listType="picture-card">
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

          <Form.Item
            name="phoneNumber"
            label="전화번호"
            rules={[
              {
                required: true,
                message: '전화번호를 입력해주세요',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="주소(시/도)" name="sidoId">
            <Select onChange={sidoChange} defaultValue="도시를 선택해주세요">
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
            <Select defaultValue="세부 위치를 선택해주세요">
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
            <TextArea rows={4} />
          </Form.Item>
          <div
            style={{
              display: 'flex',
              justifyContent: 'right',
              alignItems: 'right',
            }}
          >
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              가입하기
            </Button>
          </div>
        </Form>
        <p
          style={{
            color: '#5e5e5e',
            fontSize: '13px',
            marginTop: '10px',
          }}
        >
          가입 시, 통합 계정으로 라이트하우스가 제공하는 서비스를 모두 이용하실
          수 있습니다. 통합 계정 및 서비스 이용약관, 개인정보처리방침에
          동의합니다.
        </p>
      </Card>
    </div>
  )
}

export default SignUp
