import React from 'react'
// import { Layout, Button, Checkbox, Form, Input } from 'antd'
import { Form, Input, Button, Checkbox, Card, Typography, Col, Row } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userAction } from '../../store/user'

// import { createRoot } from 'react-router-dom';
const { Title } = Typography
// const { Content } = Layout
// 로그인

const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo)
}
//

function LogIn() {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const onFinish = value => {
    console.log(value)

    dispatch(userAction.login(value))
      .then(res => {
        // 로그인 성공하면 메인으로 보내주는 코드
        // 실패하면 안된다 함
        console.log(res)
        const userId = sessionStorage.getItem('userId')
        dispatch(userAction.profile(userId))
        // if (res.type === 'user/login/rejected') {

        // } else {
        //   console.log('login completed with user Id: ', userId)
        //   if (userId) {
        //     console.log('login success in profile')
        //   } else {
        //     console.log('log in failed... maybe??')
        //   }
      })
      .catch(err => {
        console.log(err)
        alert('안돼')
      })
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
          <Title level={2}>로그인 </Title>
        </div>
        <Form
          form={form}
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="userEmail"
            rules={[{ required: true, message: '이메일을 입력해주세요.' }]}
          >
            <Input placeholder="이메일" />
          </Form.Item>
          <Form.Item
            name="userPwd"
            rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}
          >
            <Input.Password type="password" placeholder="비밀번호" />
            {/* <a
              style={{ float: 'right' }}
              className="login-form-forgot"
              href=""
              onClick={handleForgotPassword}
            >
              Forgot password
            </a> */}
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>아이디 저장</Checkbox>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
            >
              로그인
            </Button>
            <Row justify="center" style={{ margin: '1vh' }}>
              <Col span={6} type="flex" align="middle">
                <Link to="/signup"> 비밀번호 찾기 </Link>
              </Col>
              <Col span={6} type="flex" align="middle">
                <Link to="/signup"> 회원가입 </Link>
              </Col>
            </Row>
          </Form.Item>
        </Form>
        <div
          style={{
            color: '#898989',
            textAlign: 'center',
            marginBottom: '3vh',
          }}
        >
          <p>간편 로그인</p>
          <hr style={{ background: '#8e8e8e', height: '1px', border: '0' }} />
        </div>

        <Row justify="center">
          <Col span={6} type="flex" align="middle">
            <a
              href={`https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_API_URL}/auth/callback/google&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email`}
            >
              <img
                src="/google.png"
                alt="구글 로그인"
                style={{ width: '30px', height: '30px' }}
              />
            </a>
          </Col>
          <Col span={6} type="flex" align="middle">
            <a href="#!">
              <img
                src="/kakao.png"
                alt="카카오 로그인"
                style={{ width: '30px', height: '30px' }}
              />
            </a>
          </Col>
          <Col span={6} type="flex" align="middle">
            <a href="#!">
              <img
                src="/github.png"
                alt="깃허브 로그인"
                style={{ width: '30px', height: '30px' }}
              />
            </a>
          </Col>
          <Col span={6} type="flex" align="middle">
            <a href="#!">
              <img
                src="/naver.png"
                alt="네이버 로그인"
                style={{
                  width: '30px',
                  height: '30px',
                  marginleft: 'auto',
                  marginright: 'auto',
                }}
              />
            </a>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default LogIn
