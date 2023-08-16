import React from 'react'
import { Card } from 'antd'
// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import photo from '../../static/aris.png'
import StudyCurriculum from './StudyCurriculum'
// import DatePicker from './utils/DatePicker'
// import {
//   endDateToString,
//   startDateToString,
//   image,
//   StringToDate,
// } from '../../utils/index'
// import { createStudy, updateStudy } from '../../api/study'
// import likemark from '../../static/mark/like.png'
// import bookmark from '../../static/mark/bookmark-white.png'
// import view from '../../static/mark/view.png'
// import { CreateButton } from './utils/button'
// import { studyAction } from '../../store/study'
// import { userAction } from '../../store/user'

export default function StudyInfo({ study }) {
  // const [startDate, setStartDate] = useState(StringToDate(study.startedAt))
  // const [endDate, setEndDate] = useState(StringToDate(study.endedAt))
  // const [recruitFinishedDate, setRecruitFinishedDate] = useState(
  //   StringToDate(study.recruitFinishedAt),
  // )
  // const [createdDate, setCreatedDate] = useState(StringToDate(study.createdAt))
  // const [notice, setNotice] = useState('')
  // const [uploadedImage, setUploadedImage] = useState(null)

  // const navigate = useNavigate()
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(userAction.profile(sessionStorage.getItem('userId')))
  //   dispatch(studyAction.getLike())
  // }, [])

  // const myInfo = useSelector(state => state.user.myProfile)
  // const likeList = useSelector(state => state.study.likeList)
  // console.log(myInfo)
  // console.log(likeList)

  // const handleImageUpload = event => {
  //   const imageFile = event.target.files[0]
  //   if (imageFile) {
  //     const imageUrl = URL.createObjectURL(imageFile)
  //     setUploadedImage(imageUrl)
  //   }
  // }
  // const handleStartDateChange = date => {
  //   setStartDate(date)
  // }

  // const handleEndDateChange = date => {
  //   setEndDate(date)
  // }
  // const handleRecruitFinishedDateChange = date => {
  //   setRecruitFinishedDate(date)
  // }
  // const handleCreatedDateChange = date => {
  //   setCreatedDate(date)
  // }

  // // const copyStudy = (status = study.status) => {
  // //   return {
  // //     ...study,
  // //     sessions: [...study.sessions],
  // //     studyTags: [...study.studyTags],
  // //     studyNotices: [...study.studyNotices],
  // //     startedAt: startDateToString(startDate) ?? study.startedAt,
  // //     endedAt: endDateToString(endDate) ?? study.endedAt,
  // //     recruitFinishedAt:
  // //       endDateToString(recruitFinishedDate) ?? study.recruitFinishedAt,
  // //     createdAt: startDateToString(createdDate) ?? study.createdAt,
  // //     status,
  // //     originalId: 0,
  // //   }
  // // }

  // const copyStudy = (status = study.status) => {
  //   const formData = new FormData()
  //   // console.log();
  //   formData.append('id', study.id)
  //   formData.append('isValid', study.isValid)
  //   formData.append('title', `${study.title}수정완료!!`)
  //   formData.append('description', study.description)
  //   formData.append('hit', study.hit)
  //   formData.append('rule', study.rule)
  //   formData.append('maxMember', study.maxMember)
  //   formData.append('minMember', study.minMember)
  //   formData.append('currentMember', study.currentMember)
  //   formData.append('isOnline', study.isOnline)
  //   formData.append('likeCnt', study.likeCnt)
  //   formData.append('bookmarkCnt', study.bookmarkCnt)
  //   formData.append('originalId', study.originalId ?? 0)
  //   if (study.sidoId) formData.append('sidoId', study.sidoId)
  //   if (study.gugunId) formData.append('gugunId', study.gugunId)
  //   formData.append('status', status)
  //   formData.append(
  //     'createdAt',
  //     startDateToString(createdDate) ?? study.createdAt,
  //   )
  //   formData.append(
  //     'startedAt',
  //     startDateToString(startDate) ?? study.startedAt,
  //   )
  //   formData.append('endedAt', endDateToString(endDate) ?? study.createdAt)
  //   formData.append(
  //     'recruitFinishedAt',
  //     endDateToString(recruitFinishedDate) ?? study.recruitFinishedAt,
  //   )

  //   Object.keys(study).forEach(sKey => {
  //     // studyTags
  //     if (sKey === 'studyTags') {
  //       study.studyTags?.forEach((studyTag, index) => {
  //         Object.keys(studyTag).forEach(key => {
  //           if (key !== 'tag') {
  //             formData.append(`studyTags[${index}].${key}`, studyTag[key])
  //           } else {
  //             Object.keys(studyTag[key]).forEach(tagKey => {
  //               formData.append(
  //                 `studyTags[${index}].${key}.${tagKey}`,
  //                 studyTag[key][tagKey],
  //               )
  //             })
  //           }
  //         })
  //       })
  //     }

  //     // sessions
  //     else if (sKey === 'sessions') {
  //       study.sessions?.forEach((session, index) => {
  //         Object.keys(session).forEach(key => {
  //           // studyMaterials
  //           if (key === 'studyMaterials') {
  //             session.studyMaterials?.forEach((studyMaterial, smIndex) => {
  //               Object.keys(studyMaterial).forEach(smKey => {
  //                 formData.append(
  //                   `sessions[${index}].${key}[${smIndex}].${smKey}`,
  //                   studyMaterial[smKey],
  //                 )
  //               })
  //             })
  //           }

  //           // sessionChecks
  //           else if (key === 'sessionChecks') {
  //             session.sessionChecks?.forEach((sessionCheck, scIndex) => {
  //               Object.keys(sessionCheck).forEach(scKey => {
  //                 formData.append(
  //                   `sessions[${index}].${key}[${scIndex}].${scKey}`,
  //                   sessionCheck[scKey],
  //                 )
  //               })
  //             })
  //           }

  //           // sessions
  //           else {
  //             formData.append(`sessions[${index}].${key}`, session[key])
  //           }
  //         })
  //       })
  //     }

  //     // studyNotices
  //     else if (sKey === 'studyNotices') {
  //       // formData.append('studyNotices', null)
  //       console.log(sKey)
  //     }

  //     // studyEvals
  //     else if (sKey === 'studyEvals') {
  //       // formData.append('studyEvals', null)
  //       console.log(sKey)
  //     }

  //     // badge
  //     else if (sKey === 'badge' && study.badge) {
  //       Object.keys(study.badge).forEach(key => {
  //         if (key !== 'isValid')
  //           formData.append(`badge.${key}`, study.badge[key])
  //       })
  //     }
  //   })
  //   return formData
  // }

  // const callStudyUpdateApi = async studyRequest => {
  //   console.log('callStudyUpdateApi', studyRequest)
  //   await updateStudy(
  //     studyRequest,
  //     ({ response }) => {
  //       console.log(response)
  //       dispatch(studyAction.studyDetail(studyRequest.id))
  //     },
  //     ({ error }) => {
  //       console.log(error)
  //     },
  //   )
  // }

  // const handleUpdateStudy = () => {
  //   callStudyUpdateApi(copyStudy())
  // }
  // const handleRecruitStudy = () => {
  //   callStudyUpdateApi(copyStudy(1))
  // }

  // const handleCreateStudy = () => {
  //   // 생성 해야함
  //   createStudy(
  //     study.id,
  //     ({ data }) => {
  //       console.log(data)
  //       alert('템플릿 복제 완료!!')
  //       navigate(`/study/${data.id}`)
  //     },
  //     ({ data }) => {
  //       console.log(data)
  //       alert(data)
  //     },
  //   )
  // }

  console.log('studyInfo : ', study)

  return (
    <div>
      <div
        style={{
          height: '1000px',
          width: '100%',
          backgroundColor: 'rgb(255, 255, 255)',
        }}
      >
        <Card
          title="스터디 공지"
          bordered={false}
          style={{ boxShadow: 'none' }}
        >
          <div style={{ display: 'flex', flexGrow: 1 }}>
            <p>
              {
                study.studyNotices?.reduce(
                  (res, now) =>
                    new Date(res.createdAt).getTime() >
                    new Date(now.createdAt).getTime()
                      ? res
                      : now,
                  0,
                ).content
              }
            </p>
          </div>
        </Card>
        <Card
          title="스터디 정보"
          bordered={false}
          style={{ boxShadow: 'none' }}
        >
          <div>
            <p>{study.description}</p>
            <br />
            스터디 규칙: <br />
            {study.rule?.split('\n')?.map((rulee, i) => (
              <p key={i}>{rulee}</p>
            ))}
          </div>
        </Card>
        <Card
          title="스터디 계획"
          bordered={false}
          style={{ boxShadow: 'none' }}
        >
          <div>
            <StudyCurriculum />
          </div>
        </Card>
      </div>
    </div>
  )
}
