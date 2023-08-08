import React from 'react'

// 템플릿 상세의 인원정보(멤버)

export default function JoinStudyInfo({ study }) {
  console.log(study)
  return (
    <div className="big_box">
      <div className="review_box">
        <div>
          <div className="review_mini2">
            <div>스터디 이름</div>
            <div className="review_mini">{study.title}</div>
          </div>
          <div className="review_mini2">
            <div>설명</div>
            <div className="review_mini">{study.description}</div>
          </div>
          <div className="review_mini2">
            <div>인원</div>
            <div className="review_mini">
              {study.currentMember} / {study.maxMember}
            </div>
          </div>
          <div className="review_mini2">
            <div>규칙</div>
            <div className="review_mini">
              {study.rule.split('\n').map(ru => (
                <>
                  {ru}
                  <br />
                </>
              ))}
            </div>
          </div>
          <div className="review_mini2">
            <div>날짜</div>
            <div className="review_mini">
              {study.startedAt.split(' ')[0]}&nbsp;~&nbsp;
              {study.endedAt.split(' ')[0]}
            </div>
          </div>
        </div>

        <div>
          리더
          <li key={study.leaderProfile.id}>
            <p>
              {study.leaderProfile.nickname}{' '}
              <img
                src={
                  process.env.REACT_APP_S3_DOMAIN_URL +
                  study.leaderProfile.prfileImgUrl
                }
                alt=""
                style={{ height: '15px', weight: '15px' }}
              />
              {study.leaderProfile.badges?.map(badge => (
                <img
                  src={process.env.REACT_APP_S3_DOMAIN_URL + badge.imgUrl}
                  alt={badge.description}
                  style={{ height: '15px', weight: '15px' }}
                />
              ))}
            </p>
          </li>
        </div>

        <div>
          참여인원
          {study.memberProfiles?.map(member => (
            <li key={member.id}>
              <p>
                {member.nickname}{' '}
                <img
                  src={
                    process.env.REACT_APP_S3_DOMAIN_URL + member.prfileImgUrl
                  }
                  alt=""
                />
                {member.badges?.map(badge => (
                  <img
                    src={process.env.REACT_APP_S3_DOMAIN_URL + badge.imgUrl}
                    alt={badge.description}
                  />
                ))}
              </p>
            </li>
          ))}
        </div>
      </div>
    </div>
  )
}
