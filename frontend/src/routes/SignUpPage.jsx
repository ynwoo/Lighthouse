import { useDispatch } from 'react-redux'

import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  TreeSelect,
  Upload,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { userAction } from '../store/user'

const { TextArea } = Input
const { Option } = Select

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select
      style={{
        width: 70,
        backgroundColor: 'transparent',
      }}
    >
      <Option value="86">+86</Option>
      <Option value="87">+87</Option>
    </Select>
  </Form.Item>
)
const normFile = e => {
  if (Array.isArray(e)) {
    return e
  }
  return e?.fileList
}

function SignUpPage() {
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  const testDisp = () => {
    console.log('yay')
    dispatch(userAction.test('안녕'))
  }

  const finFin = value => console.log(value)
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
        onFinish={finFin}
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
          <Input />
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
          <Input />
        </Form.Item>

        <Form.Item label="나이" name="age">
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Upload"
          name="profileImgUrl"
          valuePropName="fileList"
          getValueFromEvent={normFile}
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
            addonBefore={prefixSelector}
            style={{
              width: '100%',
            }}
          />
        </Form.Item>

        <Form.Item label="주소(시/도)" name="sido">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="주소(구/군)" name="gugun">
          <TreeSelect
            treeData={[
              {
                title: 'Light',
                value: 'light',
                children: [
                  {
                    title: 'Bamboo',
                    value: 'bamboo',
                  },
                ],
              },
            ]}
          />
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
      <button type="button" onClick={testDisp}>
        dispatch!
      </button>
    </div>
  )
}

export default SignUpPage
