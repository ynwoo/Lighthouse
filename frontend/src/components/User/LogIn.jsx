import React from 'react'
// import { Layout, Button, Checkbox, Form, Input } from 'antd'
import { Form, Input, Button, Checkbox, Card, Typography, Col, Row } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const onFinish = value => {
    console.log(value)
    dispatch(userAction.login(value)).then(res => {
      // 로그인 성공하면 메인으로 보내주는 코드
      // 실패하면 안된다 함
      if (res.type === 'user/login/rejected') {
        alert('안돼')
      } else {
        navigate('/')
      }
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
            <img
              src="/google.png"
              alt="구글 로그인"
              style={{ width: '30px', height: '30px' }}
            />
          </Col>
          <Col span={6} type="flex" align="middle">
            <img
              src="/kakao.png"
              alt="카카오 로그인"
              style={{ width: '30px', height: '30px' }}
            />
          </Col>
          <Col span={6} type="flex" align="middle">
            <img
              src="/github.png"
              alt="깃허브 로그인"
              style={{ width: '30px', height: '30px' }}
            />
          </Col>
          <Col span={6} type="flex" align="middle">
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
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default LogIn
