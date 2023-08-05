import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Input, InputNumber, Select, Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { userAction } from '../store/user'

const { TextArea } = Input

// 사진 업로드 하는 것 같음
const normFile = e => {
  if (Array.isArray(e)) {
    return e
  }
  return e?.fileList
}

function SignUpPage() {
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
        width: '100%',
        margin: '10px',
        marginLeft: '20px',
        // border: '1px solid',
        padding: '20px',
        borderRadius: '20px',
        backgroundColor: 'transparent',
      }}
    >
      <Form
        form={form}
        name="normal_login"
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
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          maxWidth: 1000,
          backgroundColor: 'transparent',
        }}
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
          style={{ width: '800px', backgroundColor: 'transparent' }}
        >
          <Input
            onChange={e => {
              setEmail(e.target.value)
            }}
          />
          <Button
            type="button"
            onClick={() => {
              if (emailInput) {
                dispatch(userAction.checkEmail(emailInput))
              }
            }}
          >
            중복확인
          </Button>
          <p>
            {emailIsValid
              ? '사용 가능한 닉네임 입니다!'
              : emailIsValid === null
              ? ''
              : '중복된 닉네임입니다!'}
          </p>
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  new Error('The new password that you entered do not match!'),
                )
              },
            }),
          ]}
        >
          <Input.Password />
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
          style={{ width: '800px', backgroundColor: 'transparent' }}
        >
          <Input
            onChange={e => {
              setNickname(e.target.value)
            }}
          />
          <Button
            type="button"
            onClick={() => {
              if (nicknameInput) {
                dispatch(userAction.checkNickname(nicknameInput))
              }
            }}
          >
            중복 확인
          </Button>
          <p>
            {nicknameIsValid
              ? '사용 가능한 닉네임 입니다!'
              : nicknameIsValid === null
              ? ''
              : '중복된 닉네임입니다!'}
          </p>
        </Form.Item>

        <Form.Item label="나이" name="age">
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Upload"
          name="profileImgUrl"
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
          label="Phone Number"
          rules={[
            {
              required: true,
              message: 'Please input your phone number!',
            },
          ]}
        >
          <Input
            style={{
              width: '100%',
            }}
          />
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
          <Button type="primary" htmlType="submit">
            SUBMIT
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default SignUpPage
