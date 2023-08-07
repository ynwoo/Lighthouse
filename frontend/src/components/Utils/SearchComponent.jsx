<<<<<<< HEAD
import React from 'react'
import { Input, Select, Space, Button } from 'antd'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setText } from '../../store/study'
=======
import React, { useEffect, useState } from 'react'
import { Input, Select, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { setOnline, setText, studyAction } from '../../store/study'
import { userAction } from '../../store/user'
>>>>>>> ff5fbb36691753512f8dfe94227406e2fcc14cfd

// 검색창
const { Search } = Input

function SearchComponent() {
  const dispatch = useDispatch()
  const params = useSelector(state => state.study.params)
  const sido = useSelector(state => state.user.sido)
  const gugun = useSelector(state => state.user.gugun)
  const [selectedSido, setSido] = useState('도시를 선택해주세요')
  const [selectedGugun, setGugun] = useState('상세 주소를 선택해 주세요')

  useEffect(() => {
    dispatch(userAction.sido())
  }, [dispatch])

  const onChange = value => {
    console.log(value.nativeEvent.data)
    dispatch(setText(value.nativeEvent.data))
  }
  const onSearch = () => {
    dispatch(studyAction.studyList(params))
  }

  // 지역
  const sidoChange = e => {
    setSido(e)
    dispatch(userAction.gugun(e))
  }
  const gugunChange = e => {
    setGugun(e)
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
            {/* 온라인 오프라인 스위치 버튼 */}
            <button
              type="button"
              onClick={() => {
                dispatch(setOnline())
              }}
            >
              {params.isOnline ? 'Online' : 'Offline'}
            </button>

            <Select onChange={sidoChange} defaultValue={selectedSido}>
              {/* 셀렉트에 시/도를 띄워주는 베열 메서드 */}
              {Object.keys(sido).map(key => {
                return (
                  <Select.Option value={Number(key)} key={key}>
                    {sido[key]}
                  </Select.Option>
                )
              })}
            </Select>
            <Select onChange={gugunChange} defaultValue={selectedGugun}>
              {/* 셀렉트에 구/군을 띄워주는 배열 메서드 */}
              {Object.keys(gugun).map(key => {
                return (
                  <Select.Option value={Number(key)} key={key}>
                    {gugun[key]}
                  </Select.Option>
                )
              })}
            </Select>
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
