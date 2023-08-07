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
        alignItems: 'center',
        height: '100vh',
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
          <Title level={2}>LIGHTHOUSE </Title>
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
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input placeholder="이메일" />
          </Form.Item>
          <Form.Item
            name="userPwd"
            rules={[{ required: true, message: 'Please input your Password!' }]}
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
            color: '#5e5e5e',
            textAlign: 'center',
            marginBottom: '3vh',
          }}
        >
          <p>간편 로그인</p>
          <hr style={{ backgroundColor: '#e1e1e1' }} />
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
    // <div
    //   style={{
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignContent: 'center',
    //     alignItems: 'center',
    //     flexDirection: 'column',
    //     margin: '10px',
    //     marginLeft: '20px',
    //     padding: '20px',
    //     borderRadius: '20px',
    //     border: '1px solid',
    //     backgroundColor: 'white',
    //     // width: '60%',
    //   }}
    // >
    //   <Layout>
    //     <Content
    //       style={{
    //         margin: '0px',
    //         backgroundColor: 'white',
    //         width: '800px',
    //         display: 'flex',
    //         justifyContent: 'center',
    //       }}
    //     >
    //       <Form
    //         form={form}
    //         name="basic"
    //         labelCol={{
    //           span: 8,
    //         }}
    //         wrapperCol={{
    //           span: 16,
    //         }}
    //         initialValues={{
    //           remember: true,
    //         }}
    //         onFinish={onFinish}
    //         onFinishFailed={onFinishFailed}
    //         autoComplete="off"
    //       >
    //         <Form.Item
    //           label="Email"
    //           name="userEmail"
    //           rules={[
    //             {
    //               required: true,
    //               message: 'Please input your username!',
    //             },
    //           ]}
    //           style={{ width: '500px' }}
    //         >
    //           <Input />
    //         </Form.Item>

    //         <Form.Item
    //           label="Password"
    //           name="userPwd"
    //           rules={[
    //             {
    //               required: true,
    //               message: 'Please input your password!',
    //             },
    //           ]}
    //           style={{
    //             maxWidth: 600,
    //             backgroundColor: 'transparent',
    //           }}
    //         >
    //           <Input.Password />
    //         </Form.Item>

    //         <Form.Item
    //           valuePropName="checked"
    //           wrapperCol={{
    //             offset: 8,
    //             span: 16,
    //           }}
    //         >
    //           <Checkbox>Remember me</Checkbox>
    //           <div style={{ display: 'flex' }}>
    //             <div
    //               style={{
    //                 display: 'flex',
    //                 flexDirection: 'column',
    //                 alignItems: 'center',
    //                 margin: '10px',
    //                 marginTop: '20px',
    //               }}
    //             >
    //               <img
    //                 src="/kakao.png"
    //                 alt="카카오 로그인"
    //                 style={{ width: '50px', height: '50px' }}
    //               />
    //               <p style={{ margin: '0', fontSize: '8px' }}>카카오</p>
    //               <p style={{ margin: '0', fontSize: '8px' }}>로그인</p>
    //             </div>

    //             <div
    //               style={{
    //                 display: 'flex',
    //                 flexDirection: 'column',
    //                 alignItems: 'center',
    //                 margin: '10px',
    //                 marginTop: '20px',
    //               }}
    //             >
    //               <img
    //                 src="/google.png"
    //                 alt="구글 로그인"
    //                 style={{ width: '50px', height: '50px' }}
    //               />
    //               <p style={{ margin: '0', fontSize: '8px' }}>구글</p>
    //               <p style={{ margin: '0', fontSize: '8px' }}>로그인</p>
    //             </div>
    //           </div>
    //         </Form.Item>

    //         <Form.Item
    //           wrapperCol={{
    //             offset: 8,
    //             span: 16,
    //           }}
    //         >
    //           <Button type="primary" htmlType="submit">
    //             SUBMIT
    //           </Button>

    //           <Link to="/signup">
    //             <Button type="primary" htmlType="submit" danger>
    //               SIGNUP
    //             </Button>
    //           </Link>
    //         </Form.Item>
    //       </Form>
    //     </Content>
    //   </Layout>
    // </div>
  )
}

export default SignIn
