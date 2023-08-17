import React, { useEffect, useState } from 'react'
import { Row, Col, Tag, Tabs, Button, Tooltip, DatePicker, Input } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBookmark as faBookmarkSolid,
  faHeart as faHeartSolid,
} from '@fortawesome/free-solid-svg-icons'
import {
  faBookmark as faBookmarkRegular,
  faHeart as faHeartRegular,
} from '@fortawesome/free-regular-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import StudyInfo from '../components/Study/StudyInfo'
import { studyAction } from '../store/study'
import { userAction } from '../store/user'
import { coverImage, image } from '../utils/image'
import UserName from '../components/Study/UserName'
import StudyReview from '../components/Study/StudyReview'
import {
  STATUS,
  StringToDate,
  endDateToString,
  startDateToString,
} from '../utils'

export default function TemplateUpdatePage() {
  const dispatch = useDispatch()
  const studyId = window.location.pathname?.split('/template/update/')[1]
  const originalStudy = useSelector(state => state.study.studyDetail)
  const [startDate, setStartDate] = useState(
    StringToDate(originalStudy.startedAt),
  )
  const [endDate, setEndDate] = useState(StringToDate(originalStudy.endedAt))
  const [recruitFinishedDate, setRecruitFinishedDate] = useState(
    StringToDate(originalStudy.recruitFinishedAt),
  )
  const [createdDate, setCreatedDate] = useState(
    StringToDate(originalStudy.createdAt),
  )
  const [uploadedImage, setUploadedImage] = useState(null)
  const [uploadedImageFile, setUploadedImageFile] = useState(null)
  const [uploadedBadgeImage, setUploadedBadgeImage] = useState(null)
  const [uploadedBadgeImageFile, setUploadedBadgeImageFile] = useState(null)

  const copyOriginalStudy = () => {
    return {
      ...originalStudy,
      studyTags: [...originalStudy.studyTags],
      // sessions: [...originalStudy.sessions],
      // studyNotices: [...originalStudy.studyNotices],
    }
  }

  const [study, setStudy] = useState(copyOriginalStudy())

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(studyAction.studyDetail(studyId))
    dispatch(userAction.profile(sessionStorage.getItem('userId')))
    dispatch(studyAction.getLike())
  }, [])

  useEffect(() => {
    setStudy(copyOriginalStudy())
  }, [originalStudy])

  const handleChangeStudy = e => {
    setStudy({ ...study, currentMember: e })
  }

  const handleImageUpload = event => {
    const imageFile = event.target.files[0]
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile)
      setUploadedImage(imageUrl)
      setUploadedImageFile(imageFile)
    }
  }

  const handleBadgeImageUpload = event => {
    const imageFile = event.target.files[0]
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile)
      setUploadedBadgeImage(imageUrl)
      setUploadedBadgeImageFile(imageFile)
    }
  }

  const handleStartDateChange = date => {
    setStartDate(date)
  }

  const handleEndDateChange = date => {
    setEndDate(date)
  }
  const handleRecruitFinishedDateChange = date => {
    setRecruitFinishedDate(date)
  }
  const handleCreatedDateChange = date => {
    setCreatedDate(date)
  }

  const copyStudy = (status = study.status) => {
    const formData = new FormData()
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
    if (uploadedImageFile) formData.append('coverImgFile', uploadedImageFile)
    formData.append('coverImgUrl', study.coverImgUrl)
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
        study.studyNotices.forEach((studyNotice, index) => {
          Object.keys(studyNotice).forEach(key => {
            // studyNoticeChecks
            if (key === 'studyNoticeChecks') {
              studyNotice.studyNoticeChecks?.forEach(
                (studyNoticeCheck, scIndex) => {
                  Object.keys(studyNoticeCheck).forEach(scKey => {
                    formData.append(
                      `studyNotices[${index}].${key}[${scIndex}].${scKey}`,
                      studyNoticeCheck[scKey],
                    )
                  })
                },
              )
            }

            // studyNotices
            else {
              formData.append(`studyNotices[${index}].${key}`, studyNotice[key])
            }
          })
        })
      }

      // studyEvals
      else if (sKey === 'studyEvals') {
        study.studyEvals?.forEach((studyEval, index) => {
          Object.keys(studyEval).forEach(key => {
            formData.append(`studyEvals[${index}].${key}`, studyEval[key])
          })
        })
      }

      // badge
      else if (sKey === 'badge') {
        if (study.badge) {
          Object.keys(study.badge).forEach(key => {
            if (key !== 'img') {
              formData.append(`badge.${key}`, study.badge[key])
            }
          })
        }
        if (uploadedBadgeImageFile) {
          formData.append(`badge.img`, uploadedBadgeImageFile)
        }
      }
    })

    return formData
  }

  const callStudyUpdateApi = async studyRequest => {
    dispatch(studyAction.studyUpdate(studyRequest)).then(() => {
      setUploadedImageFile(null)
      setUploadedBadgeImageFile(null)
    })
  }

  const handleUpdateStudy = () => {
    callStudyUpdateApi(copyStudy())
  }
  const handleRecruitStudy = () => {
    callStudyUpdateApi(copyStudy(STATUS.RECRUITING))
    navigate(`/study/${study.id}`)
  }

  const myInfo = useSelector(state => state.user.myProfile)
  const likeList = useSelector(state => state.study.likeList)
  // 해당 스터디 가입한 사람과 그렇지 않은 사람 구분
  const tabMenu = [
    {
      '스터디 기간': (
        <DatePicker
          changeStartDate={handleStartDateChange}
          changeEndDate={handleEndDateChange}
          initStartDate={study.startedAt}
          initEndDate={study.endedAt}
        />
      ),
    },
    {
      '스터디 모집 기간': (
        <DatePicker
          changeStartDate={handleCreatedDateChange}
          changeEndDate={handleRecruitFinishedDateChange}
          initStartDate={study.createdAt}
          initEndDate={study.recruitFinishedAt}
        />
      ),
    },
    { 정보: <StudyInfo study={study} /> },
    { '템플릿 리뷰': <StudyReview study={study} /> },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        <Row
          style={{
            backgroundColor: 'rgb(218, 230, 255)',
            height: '300px',
            padding: '40px',
          }}
        >
          <Col xs={24} sm={24} md={10} style={{ marginRight: '40px' }}>
            <img
              style={{
                width: '100%',
                height: '220px',
                marginLeft: '50%',
                transform: 'translateX(-50%)',
                objectFit: 'cover',
              }}
              src={uploadedImage || coverImage(study.coverImgUrl)}
              alt="coverImage"
            />
          </Col>
          <Col
            style={{
              padding: '30px 0 0 0',
            }}
          >
            <img
              src={uploadedBadgeImage || image(study.badge?.imgUrl)}
              alt={study.badge?.description}
              className="badge"
            />
            <h1 style={{ height: '40px' }}>{study.title}</h1>
            <p type="text" style={{ fontSize: '16px' }}>
              스터디장: <UserName user={study.leaderProfile} />{' '}
            </p>
            <p style={{ marginTop: '30px' }}>
              {study.isOnline
                ? '온라인'
                : study.sido && study.gugun
                ? `오프라인: 장소 - ${study.sido}, ${study.gugun}`
                : '오프라인'}
              <br />
              현재 인원:{' '}
              <Input value={study.currentMember} onChange={handleChangeStudy} />
              {/* <input
                type="text"
                value={study.currentMember}
                onChange={handleChangeStudy}
              />{' '} */}
              최대 인원: {study.maxMember} 최소 인원: {study.minMember}
              <br />
            </p>

            <div
              style={{
                fontSize: '12px',
                marginTop: '5px',
                height: '55px',
                overflow: 'hidden',
                marginBottom: '10px',
              }}
            >
              {study.studyTags.map(tag => {
                return (
                  <Tag
                    key={tag.id}
                    style={{
                      margin: '3px',
                    }}
                  >
                    #{tag.tag.keyword}
                  </Tag>
                )
              })}
            </div>
          </Col>
        </Row>
      </div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <input type="file" accept="image/*" onChange={handleBadgeImageUpload} />
      <div>
        <Row>
          <Col span={18}>
            <Tabs
              items={tabMenu.map((menu, index) => {
                return {
                  label: Object.keys(menu),
                  key: index,
                  children: Object.values(menu),
                }
              })}
            />
          </Col>
          {/* 사이드바 */}
          <Col span={6} style={{ paddingTop: '40px' }} align="middle">
            <div
              style={{
                width: '80%',
                height: '160px',
                border: 'solid 1px',
                borderColor: ' rgb(216, 216, 216)',
                borderRadius: '5%',
                position: 'sticky',
                top: '70px',
                padding: '10px',
              }}
            >
              <Button
                type="primary"
                style={{ marginTop: '30px', width: '100%' }}
                onClick={handleUpdateStudy}
              >
                템플릿 수정
              </Button>
              {study.status === STATUS.PREPARING && (
                <Button
                  type="primary"
                  style={{ marginTop: '30px', width: '100%' }}
                  onClick={handleRecruitStudy}
                >
                  모집 시작
                </Button>
              )}
              <Row style={{ marginTop: '10px' }}>
                {myInfo.bookmarkStudies?.find(
                  bookmarkStudy => bookmarkStudy.id === study.id,
                ) ? (
                  <Col
                    span={12}
                    align="middle"
                    onClick={() => {
                      dispatch(studyAction.disbookmark(study.id)).then(() => {
                        dispatch(studyAction.studyDetail(study.id))
                        dispatch(userAction.profile(myInfo.id))
                      })
                    }}
                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    <Tooltip title="북마크 취소">
                      <FontAwesomeIcon
                        className="blue"
                        icon={faBookmarkSolid}
                        beat
                      />{' '}
                      {study.bookmarkCnt}
                    </Tooltip>
                  </Col>
                ) : (
                  <Col
                    span={12}
                    align="middle"
                    onClick={() => {
                      dispatch(studyAction.bookmark(study.id)).then(() => {
                        dispatch(studyAction.studyDetail(study.id))
                        dispatch(userAction.profile(myInfo.id))
                      })
                    }}
                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    <Tooltip title="북마크">
                      <FontAwesomeIcon
                        className="blue"
                        icon={faBookmarkRegular}
                        beat
                      />{' '}
                      {study.bookmarkCnt}
                    </Tooltip>
                  </Col>
                )}

                {likeList.find(id => id === study.id) ? (
                  <Col
                    span={12}
                    align="middle"
                    onClick={() => {
                      dispatch(studyAction.dislike(study.id)).then(() => {
                        dispatch(studyAction.studyDetail(study.id))
                        dispatch(studyAction.getLike())
                      })
                    }}
                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    <Tooltip title="좋아요 취소">
                      <FontAwesomeIcon
                        className="red"
                        icon={faHeartSolid}
                        beat
                      />{' '}
                      {study.likeCnt}
                    </Tooltip>
                  </Col>
                ) : (
                  <Col
                    span={12}
                    align="middle"
                    onClick={() => {
                      dispatch(studyAction.like(study.id)).then(() => {
                        dispatch(studyAction.studyDetail(study.id))
                        dispatch(studyAction.getLike())
                      })
                    }}
                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    <Tooltip title="좋아요">
                      <FontAwesomeIcon
                        className="red"
                        icon={faHeartRegular}
                        beat
                      />{' '}
                      {study.likeCnt}
                    </Tooltip>
                  </Col>
                )}
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
