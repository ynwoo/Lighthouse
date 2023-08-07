import React from 'react'
import { Input, Select, Space, Button } from 'antd'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setText } from '../../store/study'

// 검색창
const { Search } = Input

function SearchComponent() {
  const dispatch = useDispatch()
  const onSearch = value => {
    dispatch(setText(value))
  }
  // 지역
  const handleChange = value => {
    console.log(`selected ${value}`)
  }
  return (
    <div
      style={{
        margin: '10px',
        marginLeft: '100px',
        marginBottom: '20px',
      }}
    >
      <div style={{ display: 'flex', width: '100%' }}>
        {/* 검색창 */}
        <div>
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            enterButton
            style={{ width: '500px', margin: '10px' }}
          />
        </div>
        {/* 지역 */}
        <div>
          <Space wrap>
            <Select
              defaultValue="lucy"
              style={{
                width: 120,
                margin: '10px',
              }}
              onChange={handleChange}
              options={[
                {
                  value: 'jack',
                  label: 'Jack',
                },
                {
                  value: 'lucy',
                  label: 'Lucy',
                },
                {
                  value: 'Yiminghe',
                  label: 'yiminghe',
                },
                {
                  value: 'disabled',
                  label: 'Disabled',
                  disabled: true,
                },
              ]}
            />
            <Select
              defaultValue="lucy"
              style={{
                width: 120,
                margin: '10px',
              }}
              onChange={handleChange}
              options={[
                {
                  value: 'jack',
                  label: 'Jack',
                },
                {
                  value: 'lucy',
                  label: 'Lucy',
                },
                {
                  value: 'Yiminghe',
                  label: 'yiminghe',
                },
                {
                  value: 'disabled',
                  label: 'Disabled',
                  disabled: true,
                },
              ]}
            />
          </Space>
        </div>
        <Button
          type="primary"
          style={{
            backgroundColor: '#FFDFEB',
            color: 'black',
            border: '1px solid #FFDFEB',
            borderRadius: '20px',
            padding: '8px',
            fontWeight: 'bold',
            width: '95px',
            display: 'flex',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '10px',
          }}
        >
          <Link to="tempcreate">스터디 생성</Link>
        </Button>
      </div>
    </div>
  )
}

export default SearchComponent
