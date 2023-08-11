import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Tag } from 'antd'

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
            onMouseOver={handleMouseEnter}
            // className={isHovered ? 'hovered-card' : ''}
            // bordered={false}
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
          </Card>
          {/* 레이어 카드 */}
          <Card
            onMouseOut={handleMouseLeave}
            className={isHovered ? 'hovered-card' : ''}
            // bordered={false}
            style={{
              width: '250px',
              height: '300px',
              margin: '5px',
              padding: '5px',
              whiteSpace: 'pre-line',
              boxShadow: 'none',
              backgroundColor: 'rgba(21, 21, 21, 0.93)',
              position: 'relative',
              top: '-305px',
              zIndex: '10',
              visibility: isHovered ? 'visible' : 'hidden',
            }}
            bodyStyle={{ padding: '0px 1px', textAlign: 'left' }}
          >
            <div style={{ color: '#f2f2f2' }}>
              <h3 style={{ margin: '3px' }}>{study.title}</h3>
              <div style={{ fontSize: '13px' }}>
                {study.description}i think your preference is spot-on for
                documents, but over-zealous for applications where markup
                interchange compat is not important. some major web apps are
                actually getting rid of classes and using only inline style,
                which is more predictable and easier to reason about than which
                of 5 applied rules is making the text bold. when the attribs are
                dynamic, you dont save much bandwidth like you do with
                repetitive documents. the apps semantics (view-source markup)
                are not that important either..
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Link>
  )
}

export default TempCard
