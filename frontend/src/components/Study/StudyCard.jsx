import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Typography, Tag } from 'antd'

const { Title } = Typography

const { Meta } = Card

function TempCard({ study }) {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <Link to={`/temp/${study.id}`} state={{ id: study.id }}>
      <div>
        <div>
          <Card
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={isHovered ? 'hovered-card' : ''}
            bordered={false}
            style={{
              width: '250px',
              height: '300px',
              margin: '5px',
              whiteSpace: 'pre-line',
              boxShadow: 'none',
              overflow: 'hidden',
            }}
            bodyStyle={{ padding: '0px 1px', textAlign: 'left' }}
            cover={
              <div
                style={{
                  overflow: 'hidden',
                  height: '150px',
                  alignItems: 'center',
                }}
              >
                {/* 이미지를 감싸는 div */}
                <img
                  style={{
                    height: '100%',
                    marginLeft: '50%',
                    transform: 'translateX(-50%)',
                  }}
                  alt="example"
                  src="https://s24953.pcdn.co/blog/wp-content/uploads/2018/01/Templates-Guide-header-1-1024x576.png"
                />
              </div>
            }
          >
            <div>
              <h3 style={{ margin: '0px' }}>{study.title}</h3>
              <div style={{ fontSize: '13px', color: '#6e6e6e' }}>
                <p style={{ fontSize: '12px', marginBottom: '5px' }}>
                  {study.leaderProfile.nickname}
                </p>
                <p>{`현재 ${study.currentMember}명 / 총 ${study.maxMember}명`}</p>
                <p>{`좋아요 ${study.likeCnt}  북마크 ${study.bookmarkCnt}`}</p>
                <div style={{ fontSize: '12px', marginTop: '5px' }}>
                  {study.studyTags.map(tag => {
                    // <span key={tag.id}>#{tag.tag.keyword} </span>
                    return (
                      <Tag key={tag.id} style={{ margin: '3px' }}>
                        #{tag.tag.keyword}
                      </Tag>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* 카드 내용 */}
            <Meta
              title={<Title level={5} style={{ margin: '0px' }} />}
              description={
                isHovered ? (
                  <>
                    {/* 호버 상태일 때 보여질 다른 내용 */}
                    <div>클릭하여</div>
                    <div>자세한 스터디 내용을 확인하세요 !</div>
                  </>
                ) : (
                  // 호버 상태가 아닐 때 보여질 내용
                  `${study.currentMember}/${study.maxMember}
                좋아요 ${study.likeCnt}`
                )
              }
            />
          </Card>
        </div>
      </div>
    </Link>
  )
}

export default TempCard
