import { Card, Button, Input, Form, Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import StudyCurriculum from './StudyCurriculum'
import { studyAction } from '../../store/study'
// import DatePicker from './utils/DatePicker'
import {
  endDateToString,
  startDateToString,
  StringToDate,
} from '../../utils/index'
import { updateStudy } from '../../api/study'

const { TextArea } = Input
// import { CreateButton } from './utils/button'
// import { studyAction } from '../../store/study'
// import { userAction } from '../../store/user'
const dummyRequest = ({ file, onSuccess }) => {
  console.log('file upload successful', file)
  setTimeout(() => {
    onSuccess('ok')
  }, 0)
}
const normFile = e => {
  if (Array.isArray(e)) {
    return e
  }
  return e?.fileList
}

export default function StudyEdit({ study }) {
  const [form] = Form.useForm()
  const [startDate] = useState(StringToDate(study.startedAt))
  const [endDate] = useState(StringToDate(study.endedAt))
  const [recruitFinishedDate] = useState(StringToDate(study.recruitFinishedAt))
  const [createdDate] = useState(StringToDate(study.createdAt))
  // const [description, setDescription] = useState(study.description)

  const dispatch = useDispatch()

  const copyStudy = (status = study.status) => {
    const formData = new FormData()
    // console.log();
    formData.append('id', study.id)
    formData.append('isValid', study.isValid)
    formData.append('title', study.title)
    formData.append('description', study.description)
    formData.append('hit', study.hit)
    formData.append('rule', study.rule)
    formData.append('maxMember', study.maxMember)
    formData.append('minMember', study.minMember)
    formData.append('currentMember', study.currentMember)
    formData.append('isOnline', study.isOnline)
    formData.append('likeCnt', study.likeCnt)
    formData.append('bookmarkCnt', study.bookmarkCnt)
    formData.append('originalId', study.originalId ?? 0)
    if (study.sidoId) formData.append('sidoId', study.sidoId)
    if (study.gugunId) formData.append('gugunId', study.gugunId)
    formData.append('status', status)
    formData.append(
      'createdAt',
      startDateToString(createdDate) ?? study.createdAt,
    )
    formData.append(
      'startedAt',
      startDateToString(startDate) ?? study.startedAt,
    )
    formData.append('endedAt', endDateToString(endDate) ?? study.createdAt)
    formData.append(
      'recruitFinishedAt',
      endDateToString(recruitFinishedDate) ?? study.recruitFinishedAt,
    )

    Object.keys(study).forEach(sKey => {
      // studyTags
      if (sKey === 'studyTags') {
        study.studyTags?.forEach((studyTag, index) => {
          Object.keys(studyTag).forEach(key => {
            if (key !== 'tag') {
              formData.append(`studyTags[${index}].${key}`, studyTag[key])
            } else {
              Object.keys(studyTag[key]).forEach(tagKey => {
                formData.append(
                  `studyTags[${index}].${key}.${tagKey}`,
                  studyTag[key][tagKey],
                )
              })
            }
          })
        })
      }

      // sessions
      else if (sKey === 'sessions') {
        study.sessions?.forEach((session, index) => {
          Object.keys(session).forEach(key => {
            // studyMaterials
            if (key === 'studyMaterials') {
              session.studyMaterials?.forEach((studyMaterial, smIndex) => {
                Object.keys(studyMaterial).forEach(smKey => {
                  formData.append(
                    `sessions[${index}].${key}[${smIndex}].${smKey}`,
                    studyMaterial[smKey],
                  )
                })
              })
            }

            // sessionChecks
            else if (key === 'sessionChecks') {
              session.sessionChecks?.forEach((sessionCheck, scIndex) => {
                Object.keys(sessionCheck).forEach(scKey => {
                  formData.append(
                    `sessions[${index}].${key}[${scIndex}].${scKey}`,
                    sessionCheck[scKey],
                  )
                })
              })
            }

            // sessions
            else {
              formData.append(`sessions[${index}].${key}`, session[key])
            }
          })
        })
      }

      // studyNotices
      else if (sKey === 'studyNotices') {
        // formData.append('studyNotices', null)
        console.log(sKey)
      }

      // studyEvals
      else if (sKey === 'studyEvals') {
        // formData.append('studyEvals', null)
        console.log(sKey)
      }

      // badge
      else if (sKey === 'badge' && study.badge) {
        Object.keys(study.badge).forEach(key => {
          if (key !== 'isValid')
            formData.append(`badge.${key}`, study.badge[key])
        })
      }
    })
    return formData
  }

  const callStudyUpdateApi = async studyRequest => {
    await updateStudy(
      studyRequest,
      () => {
        dispatch(studyAction.studyDetail(studyRequest.id))
      },
      ({ error }) => {
        console.log(error)
      },
    )
  }

  const handleUpdateStudy = () => {
    callStudyUpdateApi(copyStudy())
  }

  return (
    <div>
      <div
        style={{
          height: '1000px',
          width: '100%',
          marginBottom: '50px',
          backgroundColor: 'rgb(255, 255, 255)',
        }}
      >
        <Form
          form={form}
          name="register"
          layout="vertical"
          onFinish={values => {
            // submit버튼을 누르면 이루어지는 동작
            // 비밀번호 확인 지우기
            if (values.coverImgFile != null) {
              values.coverImgFile = values.coverImgFile[0].originFileObj
            }
            // redux => server
            // setDescription(values.description)
            dispatch(handleUpdateStudy())
            alert('스터디 정보 수정이 완료되었습니다.')
          }}
        >
          <Form.Item label="스터디 정보" name="description">
            <TextArea defaultValue={study.description} />
          </Form.Item>
          <Form.Item label="스터디 규칙" name="rule">
            <TextArea defaultValue={study.rule} />
          </Form.Item>
          <Form.Item
            label="커버 사진"
            name="coverImgFile"
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
          <Card
            title="스터디 계획"
            bordered={false}
            style={{ boxShadow: 'none' }}
          >
            <div>
              <StudyCurriculum />
            </div>
          </Card>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            {' '}
            수정하기
          </Button>
        </Form>
      </div>
    </div>
  )
}
