import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'antd'

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
        <Card
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={isHovered ? 'hovered-card' : ''}
          style={{
            width: '260px',
            margin: '25px',
            whiteSpace: 'pre-line',
            height: '100%',
          }}
          cover={
            <div className="cover-wrapper">
              {/* 이미지를 감싸는 div */}
              <img
                style={{ width: '240px', margin: '10px' }}
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            </div>
          }
        >
          {/* 카드 내용 */}
          <Meta
            title={study.title}
            description={
              isHovered ? (
                <>
                  {/* 호버 상태일 때 보여질 다른 내용 */}
                  <div>클릭하여</div>
                  <div>자세한 스터디 내용을 확인하세요 !</div>
                </>
              ) : (
                // 호버 상태가 아닐 때 보여질 내용
                `${study.isOnline ? '온라인' : '오프라인'}
                ${study.currentMember}/${study.maxMember}
                ${study.likeCnt}개의 따봉`
              )
            }
          />
          {study.studyTags.map(tag => {
            return <span key={tag.id}>#{tag.tag.keyword} </span>
          })}
        </Card>
      </div>
    </Link>
  )
}

export default TempCard
