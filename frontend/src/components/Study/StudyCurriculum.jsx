import React, { useState } from 'react'
import { Button, Input, Form, List, Divider, Modal } from 'antd'
import { useDispatch } from 'react-redux'
import { studyAction } from '../../store/study'

export default function StudyCurriculum({ study }) {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const sessions = study.sessions?.toSorted((a, b) => a.seqNum - b.seqNum)
  // 모달

  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = values => {
    values.studyId = study.id
    values.status = 0
    values.seqNum = study.sessions?.length

    dispatch(studyAction.addCurr(values))
      .unwrap()
      .then(() => {
        alert('새로운 커리큘럼이 등록되었습니다!')
        dispatch(studyAction.studyDetail(study.id))
        form.setFieldsValue({
          title: '',
          description: '',
        })
        setIsModalVisible(false)
      })
  }
  const handleCancel = () => {
    form.resetFields()
    setIsModalVisible(false)
  }

  return (
    <div>
      <Form
        form={form}
        name="register"
        onFinish={values => {
          values.studyId = study.id
          values.status = 0
          values.seqNum = study.sessions?.length
          dispatch(studyAction.addCurr(values))
            .unwrap()
            .then(() => {
              alert('새로운 커리큘럼이 등록되었습니다!')
              dispatch(studyAction.studyDetail(study.id))
              form.setFieldsValue({
                title: '',
                description: '',
              })
            })
        }}
      />
      {study.leaderProfile?.id === Number(sessionStorage.getItem('userId')) ? (
        <div>
          <Form>
            <Button type="primary" onClick={showModal}>
              입력하기
            </Button>
          </Form>

          <Modal
            title="Add Cur"
            visible={isModalVisible}
            onOk={() => {
              form
                .validateFields()
                .then(values => {
                  handleOk(values)
                })
                .catch(errorInfo => {
                  console.log('Validation failed:', errorInfo)
                })
            }}
            onCancel={handleCancel}
          >
            <Form form={form}>
              <Form.Item label="title" name="title">
                <Input />
              </Form.Item>
              <Form.Item label="description" name="description">
                <Input.TextArea />
              </Form.Item>
            </Form>
          </Modal>
          <Divider />
        </div>
      ) : (
        <p />
      )}

      <List
        itemLayout="horizontal"
        style={{ height: '500px', overflow: 'auto' }}
        dataSource={sessions}
        renderItem={session => (
          <List.Item>
            <List.Item.Meta
              title={session.title}
              description={
                <div>
                  <p style={{ fontSize: '12px' }}>{session.description}</p>
                </div>
              }
            />
            {session.status === 0 ? <p>✔</p> : <p>🕑</p>}
            {study.leaderProfile?.id ===
            Number(sessionStorage.getItem('userId')) ? (
              <Button
                onClick={() => {
                  dispatch(studyAction.deleteCurr(session.id)).then(() => {
                    alert('커리큘럼이 삭제되었습니다!')
                    dispatch(studyAction.studyDetail(study.id))
                  })
                }}
              >
                🗑
              </Button>
            ) : (
              <p />
            )}
          </List.Item>
        )}
      />
    </div>
  )
}
