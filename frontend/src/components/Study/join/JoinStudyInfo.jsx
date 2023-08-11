import React from 'react'
import { Table } from 'antd'
import { Link } from 'react-router-dom'
// 템플릿 상세의 인원정보(멤버)

export default function JoinStudyInfo({ study }) {
  console.log(study)
  const dataSource = study.memberProfiles.map(member => {
    return {
      key: member.id,
      nickname: (
        <Link to={`/user_edit/${member?.id}`} state={{ userId: member?.id }}>
          {member.nickname}
        </Link>
      ),
      description: member.description,
      score: member.score,
    }
  })

  const columns = [
    {
      title: '닉네임',
      dataIndex: 'nickname',
      key: 'nickname',
    },
    {
      title: '자기소개',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '점수',
      dataIndex: 'score',
      key: 'score',
    },
  ]
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
          <div>
            참여인원
            <Table dataSource={dataSource} columns={columns} />
          </div>
        </div>
      </div>
    </div>
  )
}
