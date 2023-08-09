import React, { useEffect, useState } from 'react'
import { Layout } from 'antd'
import SideComponent from '../components/Utils/SideComponent'
import StudyList from '../components/Study/StudyList'
import SearchComponent from '../components/Utils/SearchComponent'
import { getStudyAll } from '../api/study'

const { Footer, Content } = Layout

// 컨텐츠
const contentStyle = {
  textAlign: 'center',
  minHeight: '100%',
  lineHeight: '130%',
  color: '#fff',
  backgroundColor: 'transparent',
  margin: '10px',
}

// 푸터
const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#7dbcea',
}
// 내부 탭
export default function MainPage() {
  // const study = dummy.study_detail[window.location.pathname.split('/')[2] - 1]
  const [templates, setTemplates] = useState(null)
  const params = new URLSearchParams(window.location.search)
  const options = {
    page: params.get('page') || 0,
    key: params.get('key'),
    word: params.get('word'),
    orderKey: params.get('order-key') || 'like',
    orderBy: params.get('order-by') || 'desc',
    isOnline: params.get('is-online') || 0,
    tagIds: params.getAll('tagIds') ?? [],
    status: 5,
  }
  console.log('options', options)

  useEffect(() => {
    getStudyAll(
      options,
      ({ data }) => {
        console.log(data)
        setTemplates(data.content)
      },
      ({ data }) => {
        console.log(data)
      },
    )
  }, options)

  console.log(templates)

  return (
    <div>
      <div className="info_container">
        {/* 사이드바 */}
        <div style={{ height: '100px' }}>
          <div>
            <SideComponent study={templates} />
          </div>
        </div>

        {/* 컨텐츠 */}
        <div className="main_item">
          <Content style={contentStyle}>
            <div
              style={{
                // margin: '10px',
                backgroundColor: 'transparent',
                width: '100%',
              }}
            >
              {/* 검색창 */}
              <SearchComponent />
            </div>
            <StudyList studies={templates} />
          </Content>
        </div>
      </div>
      {/* </div> */}
      {/* 푸터 */}
      <Footer style={footerStyle}>
        &copy; Lighthouse {new Date().getFullYear()}
      </Footer>
    </div>
  )
}
