import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Tag, Row, Col, Tooltip } from 'antd'
import { HeartOutlined, BookOutlined, EyeOutlined } from '@ant-design/icons'
import { coverImage } from '../../utils/image'
import CustomTitle from './CustomTitle'
import { STATUS } from '../../utils'

function StudyCard({ study }) {
  const [isHovered, setIsHovered] = useState(false)

  const navigate = useNavigate()

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const handleMovePage = () => {
    const { status, leaderProfile } = study
    if (
      status === STATUS.PREPARING &&
      leaderProfile?.id === Number(sessionStorage.getItem('userId'))
    ) {
      navigate(`/template/update/${study.id}`)
    } else if (status === STATUS.RECRUITING) {
      navigate(`/study/${study.id}`)
    } else if (status === STATUS.PROGRESS) {
      navigate(`/inprogress/${study.id}`)
    } else if (status === STATUS.TERMINATED) {
      navigate(`/study/${study.id}`)
    } else if (status === STATUS.SHARE) {
      navigate(`/template/${study.id}`)
    } else {
      navigate(`/study/${study.id}`)
    }
  }
  const cardWidth = '100%'
  const cardHeight = '250px'
  return (
    <div>
      <div style={{ position: 'relative' }}>
        <Card
          onMouseOver={handleMouseEnter}
          // className={isHovered ? 'hovered-card' : ''}
          bordered={false}
          style={{
            width: { cardWidth },
            height: { cardHeight },
            paddingBottom: '5px',
            whiteSpace: 'pre-line',
            boxShadow: 'none',
            overflow: 'hidden',
          }}
          bodyStyle={{ padding: '0px 1px', textAlign: 'left' }}
          cover={
            <div
              style={{
                overflow: 'hidden',
                height: '130px',
                alignItems: 'center',
              }}
            >
              {/* 이미지를 감싸는 div */}
              <img
                style={{
                  width: '100%',
                  height: '100%',
                  marginLeft: '50%',
                  transform: 'translateX(-50%)',
                  objectFit: 'cover',
                }}
                alt="coverImage"
                src={coverImage(study.coverImgUrl)}
              />
            </div>
          }
        >
          <div>
            <CustomTitle text={study.title} />
            <div style={{ fontSize: '13px', color: '#6e6e6e' }}>
              <p style={{ fontSize: '12px', marginBottom: '20px' }}>
                {study.leaderProfile?.nickname}
              </p>
              {study.status === STATUS.SHARE ? (
                <p>템플릿</p>
              ) : (
                <p>{`현재 ${study.currentMember}명 / 총 ${study.maxMember}명`}</p>
              )}

              <p>
                <HeartOutlined /> {study.likeCnt} <BookOutlined />{' '}
                {study.bookmarkCnt} <EyeOutlined /> {study.hit}
              </p>
            </div>
          </div>
        </Card>
        <Card
          onClick={handleMovePage}
          onMouseLeave={handleMouseLeave}
          className={isHovered ? 'hovered-card' : ''}
          bordered={false}
          style={{
            width: '100%',
            height: { cardHeight },
            padding: '5px',
            whiteSpace: 'pre-line',
            boxShadow: 'none',
            backgroundColor: 'rgba(21, 21, 21, 0.88)',
            position: 'absolute',
            top: '0',
            zIndex: '10',
            visibility: isHovered ? 'visible' : 'hidden',
            cursor: 'pointer',
          }}
          bodyStyle={{ padding: '0px 1px', textAlign: 'left' }}
        >
          <div style={{ color: '#f2f2f2' }}>
            <CustomTitle text={study.title} />
            <div
              style={{
                minHeight: '85px',
                marginTop: '5px',
              }}
            >
              <div
                style={{
                  fontSize: '13px',
                  overflow: 'hidden',
                  whiteSpace: 'normal',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: 'vertical',
                  wordBreak: 'keep-all',
                  marginBottom: '10px',
                }}
              >
                {study.description}
              </div>
            </div>
            <div
              style={{
                fontSize: '14px',
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
                      color: '#ace8ff',
                      borderColor: '#ace8ff',
                    }}
                  >
                    #{tag.tag.keyword}
                  </Tag>
                )
              })}
            </div>
            <hr />
            <Row justify="end" style={{ margin: '10px 10px' }}>
              <Col span={4} align="middle" style={{ margin: '0px 5px' }}>
                <Tooltip title="좋아요">
                  <HeartOutlined
                    style={{ fontSize: '30px', color: 'rgb(255, 76, 76)' }}
                    onClick={e => {
                      e.preventDefault()
                    }}
                  />
                </Tooltip>
              </Col>
              <Col span={4}>
                <Tooltip title="북마크">
                  <BookOutlined
                    style={{ fontSize: '30px', color: 'rgb(116, 163, 255)' }}
                    onClick={e => {
                      e.preventDefault()
                    }}
                  />
                </Tooltip>
              </Col>
            </Row>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default StudyCard
