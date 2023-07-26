import React from 'react'
import { Input, Select, Space } from 'antd'

// 검색창
const { Search } = Input
const onSearch = value => console.log(value)
// 지역
const handleChange = value => {
  console.log(`selected ${value}`)
}

export default function SearchComponent() {
  return (
    <div>
      <h2>현재 모집 중인 스터디</h2>
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
      </div>
    </div>
  )
}
