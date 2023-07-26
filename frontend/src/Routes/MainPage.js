import React, { useContext } from 'react'
import { Layout } from 'antd';
import SideComponent from '../components/Utils/SideComponent'
import MainComponent from '../components/Utils/MainComponent'
import SearchComponent from '../components/Utils/SearchComponent'

const { Footer, Content } = Layout;



// 컨텐츠
const contentStyle = {
  textAlign: 'center',
  minHeight: '100%',
  lineHeight: '130%',
  color: '#fff',
  backgroundColor: 'transparent',
  margin: '10px'
};


// 푸터
const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#7dbcea',
};

// 내부 탭
export default function MainPage() {
  console.log(useContext)
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        backgroundImage: 'linear-gradient(to bottom, #74A3FF, #FFFFFF 25%)',
        marginTop: '-10px',
      }}
    >
      <Layout style={{ backgroundColor: 'transparent' }}>
        <Layout hasSider style={{ backgroundColor: 'transparent' }}>

          {/* 사이드바 */}
          <SideComponent />

          {/* 컨텐츠 */}
          <Content style={contentStyle}>
            <div style={{ margin: '10px', backgroundColor: 'transparent', width: '100%' }}>
              {/* 검색창 */}
              <SearchComponent />
            </div>
            <MainComponent />
          </Content>
        </Layout>

        {/* 푸터 */}
        <Footer style={footerStyle}>
          &copy; Lighthouse {new Date().getFullYear()}
        </Footer>
      </Layout>
    </div >
  );
}
