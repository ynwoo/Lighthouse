import React from 'react'
import { Link } from 'react-router-dom'
import photo from '../../../static/aris.png'
import StudyCurriculum from '../StudyCurriculum'
import likemark from '../../../static/mark/like.png'
import bookmark from '../../../static/mark/bookmark-white.png'
import view from '../../../static/mark/view.png'

export default function TempInfo({ study }) {
  const [uploadedImage, setUploadedImage] = useState(null)

  const handleImageUpload = event => {
    const imageFile = event.target.files[0]
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile)
      setUploadedImage(imageUrl)
    }
  }
  return (
    <div className="big_box">
      <div className="study_container">
        <img
          src={uploadedImage || photo}
          alt="아리스"
          style={{ width: '100%' }}
        />
        <div className="study_box">
          <h1>
            {study.title}( {study.currentMember} / {study.maxMember} )
          </h1>
          <h3>
            스터디장 :{' '}
            <Link
              to={`/user/${study.leaderProfile?.id}`}
              state={{ userId: study.leaderProfile?.id }}
              className="dropdown_toggle"
            >
              {study.leaderProfile ? study.leaderProfile.nickname : `로딩중`}
            </Link>
          </h3>
          <h3>해시태그</h3>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px',
            }}
          >
            {study.studyTags ? (
              study.studyTags.map(tag => (
                <p key={tag.id}> #{tag.tag.keyword} &nbsp;</p>
              ))
            ) : (
              <p>loading...</p>
            )}
          </div>
          <hr />
          <div className="mark_container">
            <div />
            <div />
            <div />
            <div>
              <img src={view} alt="" style={{ width: '20px' }} />
            </div>
            <div> {study.bookmarkCnt}</div>
            <div>
              <img src={bookmark} alt="" style={{ width: '20px' }} />
            </div>
            <div>{study.bookmarkCnt}</div>
            <div>
              <img src={likemark} alt="" style={{ width: '20px' }} />
            </div>
            <div> {study.likeCnt}</div>
          </div>
        </div>
      </div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <div className="info_text">
        <ul>
          <p>스터디 정보</p>
        </ul>
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

      {/* <p>
        {' '}
        {study.isOnline
          ? '온라인'
          : `장소 - ${study.sido}, ${study.gugun}`}{' '}
      </p> */}
      <div>
        <div className="info_text">
          <ul>
            <p>스터디 기간</p>
          </ul>
        </div>
        <div>시작 - {study.startedAt?.split(' ')[0]}</div>
        <div>끝 - {study.endedAt?.split(' ')[0]}</div>
        <div />
      </div>
      <div>
        <div className="info_text">
          <ul>
            <p>모집 기간</p>
          </ul>
        </div>
        <div>모집 마감 - {study.recruitFinishedAt?.split(' ')[0]} 까지</div>
      </div>
      <div className="info_text">
        <ul>
          <p>커리큘럼</p>
        </ul>
      </div>
      <div style={{ textAlign: 'left', margin: '10px' }}>
        <StudyCurriculum />
      </div>
    </div>
  )
}
