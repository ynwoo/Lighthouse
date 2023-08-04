import React from 'react'
import { Input, Select, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { setText, studyAction } from '../../store/study'

// 검색창
const { Search } = Input

function SearchComponent() {
  const dispatch = useDispatch()
  const params = useSelector(state => state.study.params)

  const onChange = value => {
    console.log(value.nativeEvent.data)
    dispatch(setText(value.nativeEvent.data))
  }
  const onSearch = () => {
    dispatch(studyAction.studyList(params))
  }
  // 지역
  const handleChange = value => {
    console.log(`selected ${value}`)
  }
  return (
    <div
      style={{
        margin: '10px',
        marginLeft: '230px',
      }}
    >
      <h2>현재 모집 중인 스터디</h2>
      <div style={{ display: 'flex', width: '100%' }}>
        {/* 검색창 */}
        <div>
          <Search
            placeholder="input search text"
            onChange={onChange}
            onSearch={onSearch}
            defaultValue=""
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

export default SearchComponent
