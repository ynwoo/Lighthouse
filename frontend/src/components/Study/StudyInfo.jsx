import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'antd'
import photo from '../../static/aris.png'
import StudyCurriculum from './StudyCurriculum'
import DatePicker from './utils/DatePicker'
import {
  endDateToString,
  startDateToString,
  image,
  StringToDate,
} from '../../utils/index'
import { createStudy, updateStudy } from '../../api/study'
import likemark from '../../static/mark/like.png'
import bookmark from '../../static/mark/bookmark-white.png'
import view from '../../static/mark/view.png'
import { CreateButton } from './utils/button'
import { studyAction } from '../../store/study'
import { userAction } from '../../store/user'

export default function StudyInfo({ study }) {
  const [startDate, setStartDate] = useState(StringToDate(study.startedAt))
  const [endDate, setEndDate] = useState(StringToDate(study.endedAt))
  const [recruitFinishedDate, setRecruitFinishedDate] = useState(
    StringToDate(study.recruitFinishedAt),
  )
  const [createdDate, setCreatedDate] = useState(StringToDate(study.createdAt))
  const [notice, setNotice] = useState('')
  const [uploadedImage, setUploadedImage] = useState(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userAction.profile(sessionStorage.getItem('userId')))
    dispatch(studyAction.getLike())
  }, [])

  const myInfo = useSelector(state => state.user.myProfile)
  const likeList = useSelector(state => state.study.likeList)
  console.log(myInfo)
  console.log(likeList)

  const handleImageUpload = event => {
    const imageFile = event.target.files[0]
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile)
      setUploadedImage(imageUrl)
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

  // const copyStudy = (status = study.status) => {
  //   return {
  //     ...study,
  //     sessions: [...study.sessions],
  //     studyTags: [...study.studyTags],
  //     studyNotices: [...study.studyNotices],
  //     startedAt: startDateToString(startDate) ?? study.startedAt,
  //     endedAt: endDateToString(endDate) ?? study.endedAt,
  //     recruitFinishedAt:
  //       endDateToString(recruitFinishedDate) ?? study.recruitFinishedAt,
  //     createdAt: startDateToString(createdDate) ?? study.createdAt,
  //     status,
  //     originalId: 0,
  //   }
  // }

  const copyStudy = (status = study.status) => {
    const formData = new FormData()
    // console.log();
    formData.append('id', study.id)
    formData.append('isValid', study.isValid)
    formData.append('title', `${study.title}수정완료!!`)
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
    console.log('callStudyUpdateApi', studyRequest)
    await updateStudy(
      studyRequest,
      ({ response }) => {
        console.log(response)
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
  const handleRecruitStudy = () => {
    callStudyUpdateApi(copyStudy(1))
  }

  const handleCreateStudy = () => {
    // 생성 해야함
    createStudy(
      study.id,
      ({ data }) => {
        console.log(data)
        alert('템플릿 복제 완료!!')
        navigate(`/temp/${data.id}`)
      },
      ({ data }) => {
        console.log(data)
        alert(data)
      },
    )
  }

  console.log('studyInfo : ', study)

  return (
    <div className="big_box">
      <div className="study_container">
        <img
          src={uploadedImage || photo}
          alt="아리스"
          style={{ width: '100%' }}
        />
        <div className="study_box">
          {study.status === 5 && (
            <CreateButton onClick={handleCreateStudy}>템플릿 복제</CreateButton>
          )}

          <h1>
            {study.title}( {study.currentMember} / {study.maxMember} )
            {study.badge?.imgUrl && (
              <img
                src={image(study.badge.imgUrl)}
                alt={study.badge?.description}
                className="badge"
              />
            )}
          </h1>
          <h3>
            스터디장 :{' '}
            <Link
              to={`/user_edit/${study.leaderProfile?.id}`}
              state={{ userId: study.leaderProfile?.id }}
              className="dropdown_toggle"
            >
              {study.leaderProfile ? study.leaderProfile.nickname : `로딩중`}
            </Link>
            {study.leaderProfile?.badges && (
              <img
                src={image(study.leaderProfile?.badges[0]?.imgUrl)}
                alt={study.leaderProfile.badges[0]?.description}
                className="badge"
              />
            )}
          </h3>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px',
            }}
          >
            {study.studyTags?.map(tag => (
              <p key={tag.id}> #{tag.tag.keyword} &nbsp;</p>
            ))}
          </div>
          <br />
          <div className="mark_container">
            <div />
            <div />
            <div />
            <div>
              <img src={view} alt="" style={{ width: '20px' }} />
            </div>
            <div> {study.bookmarkCnt}</div>
            <div>
              {myInfo.bookmarkStudies?.find(
                bookmarkStudy => bookmarkStudy.id === study.id,
              ) ? (
                <button
                  type="button"
                  onClick={() => {
                    dispatch(studyAction.disbookmark(study.id)).then(() => {
                      dispatch(studyAction.studyDetail(study.id))
                      dispatch(userAction.profile(myInfo.id))
                    })
                  }}
                >
                  <img src={bookmark} alt="" style={{ width: '20px' }} />
                  않북마크
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    dispatch(studyAction.bookmark(study.id)).then(() => {
                      dispatch(studyAction.studyDetail(study.id))
                      dispatch(userAction.profile(myInfo.id))
                    })
                  }}
                >
                  <img src={bookmark} alt="" style={{ width: '20px' }} />
                </button>
              )}
            </div>
            <div>{study.bookmarkCnt}</div>
            <div>
              {likeList.find(id => id === study.id) ? (
                <button
                  type="button"
                  onClick={() => {
                    dispatch(studyAction.dislike(study.id)).then(() => {
                      dispatch(studyAction.studyDetail(study.id))
                      dispatch(studyAction.getLike())
                    })
                  }}
                >
                  <img src={likemark} alt="" style={{ width: '20px' }} />
                  않좋아요
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    dispatch(studyAction.like(study.id)).then(() => {
                      dispatch(studyAction.studyDetail(study.id))
                      dispatch(studyAction.getLike())
                    })
                  }}
                >
                  <img src={likemark} alt="" style={{ width: '20px' }} />
                </button>
              )}
            </div>
            <div> {study.likeCnt}</div>
          </div>
        </div>
      </div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <div className="info_text">
        <p>스터디 공지</p>
      </div>
      <h2>
        {/* 가장 마지막에 올린 공지 추리는 코드 */}
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
      </h2>

      <input
        type="text"
        value={notice}
        onChange={e => {
          setNotice(e.target.value)
        }}
      />
      <Button
        type="button"
        onClick={() => {
          const data = {
            studyId: study.id,
            content: notice,
          }
          dispatch(studyAction.addNotice(data)).then(() =>
            dispatch(studyAction.studyDetail(study.id)),
          )
          setNotice('')
        }}
      >
        공지 추가
      </Button>
      <Button
        type="button"
        onClick={() => {
          const data = {
            userId: myInfo.id,
            studyId: study.id,
            question: notice,
          }
          dispatch(studyAction.addQnA(data)).then(() =>
            dispatch(studyAction.studyDetail(study.id)),
          )
          setNotice('')
        }}
      >
        QnA 등록
      </Button>
      <div className="info_text">
        <p>스터디 정보</p>
      </div>
      <p style={{ margin: '0 auto' }}>{study.description}</p>
      {study.rule?.split('\n')?.map((rulee, i) => (
        <p key={i}>{rulee}</p>
      ))}

      <p>{study.badge && `배지 - ${study.badge.name}`}</p>

      <p>
        {' '}
        {study.isOnline
          ? '온라인'
          : study.sido && study.gugun
          ? `장소 - ${study.sido}, ${study.gugun}`
          : ''}{' '}
      </p>
      <div className="info_text">
        <p>커리큘럼</p>
      </div>
      <div style={{ textAlign: 'left', margin: '10px' }}>
        <StudyCurriculum />
      </div>
      <div>
        <div className="info_text">
          <p>모집대상</p>
        </div>
      </div>
      <div>
        <div className="info_text">
          <p>스터디 기간</p>
        </div>
        <div>
          <DatePicker
            changeStartDate={handleStartDateChange}
            changeEndDate={handleEndDateChange}
            initStartDate={study.startedAt}
            initEndDate={study.endedAt}
          />
        </div>
      </div>
      <div>
        <div className="info_text">
          <p>모집 기간</p>
        </div>
      </div>
      <DatePicker
        changeStartDate={handleCreatedDateChange}
        changeEndDate={handleRecruitFinishedDateChange}
        initStartDate={study.createdAt}
        initEndDate={study.recruitFinishedAt}
      />
      <button className="button" type="button" onClick={handleUpdateStudy}>
        저장
      </button>
      {study.status === 0 && (
        <button className="button" type="button" onClick={handleRecruitStudy}>
          모집 시작
        </button>
      )}
    </div>
  )
}
