import React from 'react'
import { Layout, Button, Checkbox, Form, Input } from 'antd'
import { Link } from 'react-router-dom'
// import { createRoot } from 'react-router-dom';

const { Content } = Layout
// 로그인
const onFinish = values => {
  console.log('Success:', values)
}
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo)
}
//

function SignIn() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        margin: '10px',
        marginLeft: '20px',
        // border: '1px solid',
        padding: '20px',
        borderRadius: '20px',
        backgroundColor: 'transparent',
        // backgroundColor: 'white',
        // margin: '0px',
      }}
    >
      <Layout>
        <Content style={{ margin: '0px', backgroundColor: 'white' }}>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
              backgroundColor: 'transparent',
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
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
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Link to="/">
                <Button type="primary" htmlType="submit">
                  SUBMIT
                </Button>
              </Link>

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
