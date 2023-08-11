import React, { useEffect, useState } from 'react'
import { Input, Select, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { setParams, studyAction } from '../../store/study'
import { userAction } from '../../store/user'

const styles = {
  backgroundColor: 'white',
  color: 'black',
  border: '1px solid #A4C3FF',
  borderRadius: '20px',
  padding: '10px',
  fontWeight: 'bold',
  width: '100px',
  display: 'flex',
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '10px',
  marginTop: '10px',
}
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

  const onSearch = val => {
    const newParams = { ...params, word: val }
    dispatch(setParams(newParams))
    dispatch(studyAction.studyList(newParams))
  }

  // 지역
  const sidoChange = e => {
    setSido(e)
    dispatch(userAction.gugun(e))
  }
  const gugunChange = e => {
    setGugun(e)
  }

  const onChange = e => {
    dispatch(setParams({ ...params, [e.target.name]: e.target.value }))
  }

  const setOrderBy = () => {
    dispatch(
      setParams({
        ...params,
        orderBy: params.orderBy === 'desc' ? 'asc' : 'desc',
      }),
    )
  }

  const setIsOnline = () => {
    dispatch(setParams({ ...params, isOnline: params.isOnline ? 0 : 1 }))
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
            name="word"
            placeholder="input search text"
            onSearch={onSearch}
            defaultValue=""
            enterButton
            style={{ width: '500px', margin: '10px' }}
          />
        </div>
        {/* 지역 */}
        <div style={{}}>
          <Space wrap>
            {/* 검색 key */}
            <select
              style={styles}
              name="key"
              value={params.key}
              onChange={onChange}
            >
              <option value="title">제목</option>
            </select>

            {/* 정렬 key */}
            <select
              style={styles}
              name="orderKey"
              value={params.orderKey}
              onChange={onChange}
            >
              <option value="">최신순</option>
              <option value="like">좋아요순</option>
              <option value="bookmark">북마크순</option>
            </select>

            {/* 오름차순 내림차순 */}
            <button
              style={styles}
              type="button"
              onClick={setOrderBy}
              name="orderBy"
            >
              {params.orderBy === 'desc' ? '내림차순' : '오름차순'}
            </button>

            {/* 온라인 오프라인 스위치 버튼 */}
            <button
              style={styles}
              type="button"
              onClick={setIsOnline}
              name="isOnline"
            >
              {params.isOnline ? 'Online' : 'Offline'}
            </button>
            {!params.isOnline && (
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
            )}
            {!params.isOnline && (
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
            )}
          </Space>
        </div>
        {/* <Button
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
        </Button> */}
      </div>
    </div>
  )
}

export default SearchComponent
