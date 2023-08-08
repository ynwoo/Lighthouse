import React from 'react'
import { Layout, Button, Checkbox, Form, Input } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userAction } from '../../store/user'

// import { createRoot } from 'react-router-dom';

const { Content } = Layout
// 로그인

const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo)
}
//

function SignIn() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const onFinish = value => {
    console.log(value)
    dispatch(userAction.login(value)).then(res => {
      // 로그인 성공하면 메인으로 보내주는 코드
      // 실패하면 안된다 함
      if (res.type === 'user/login/fulfilled') {
        navigate('/')
      } else {
        alert('안돼')
      }
    })
  }
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        margin: '10px',
        marginLeft: '20px',
        padding: '20px',
        borderRadius: '20px',
        border: '1px solid',
        backgroundColor: 'white',
        // width: '60%',
      }}
    >
      <Layout>
        <Content
          style={{
            margin: '0px',
            backgroundColor: 'white',
            width: '800px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Form
            form={form}
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="userEmail"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
              style={{ width: '500px' }}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="userPwd"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              style={{
                maxWidth: 600,
                backgroundColor: 'transparent',
              }}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>Remember me</Checkbox>
              <div style={{ display: 'flex' }}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: '10px',
                    marginTop: '20px',
                  }}
                >
                  <img
                    src="/kakao.png"
                    alt="카카오 로그인"
                    style={{ width: '50px', height: '50px' }}
                  />
                  <p style={{ margin: '0', fontSize: '8px' }}>카카오</p>
                  <p style={{ margin: '0', fontSize: '8px' }}>로그인</p>
                </div>
                <a
                  href={`https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_API_URL}/auth/callback/google&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email`}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      margin: '10px',
                      marginTop: '20px',
                    }}
                  >
                    <img
                      src="/google.png"
                      alt="구글 로그인"
                      style={{ width: '50px', height: '50px' }}
                    />
                    <p style={{ margin: '0', fontSize: '8px' }}>google</p>
                    <p style={{ margin: '0', fontSize: '8px' }}>로그인</p>
                  </div>
                </a>
              </div>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                SUBMIT
              </Button>

              <Link to="/signup">
                <Button type="primary" htmlType="submit" danger>
                  SIGNUP
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </Content>
      </Layout>
    </div>
  )
}

export default SignIn
