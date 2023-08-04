import React from 'react'
import { Layout } from 'antd'
import SideComponent from '../components/Utils/SideComponent'
import MainComponent from '../components/Utils/MainComponent'
import SearchComponent from '../components/Utils/SearchComponent'

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
  return (
    <div>
      {/* <ImageSlide imageData={imageData} /> */}
      <div className="info_container">
        {/* 사이드바 */}
        <div style={{ position: 'fixed' }}>
          <SideComponent />
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
            <MainComponent />
          </Content>
        </div>
      </div>
      {/* 푸터 */}
      <Footer style={footerStyle}>
        &copy; Lighthouse {new Date().getFullYear()}
      </Footer>
    </div>
  )
}
