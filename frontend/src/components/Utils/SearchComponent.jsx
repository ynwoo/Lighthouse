import React, { useEffect, useState } from 'react'
import { Input, Row, Select, Space, Col, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { setParams, studyAction } from '../../store/study'
import { userAction } from '../../store/user'

// 검색창
const { Search } = Input

function SearchComponent({ status }) {
  const dispatch = useDispatch()
  const params = useSelector(state => state.study.params)
  const sido = useSelector(state => state.user.sido)
  const gugun = useSelector(state => state.user.gugun)
  const [word, setWord] = useState('')

  useEffect(() => {
    setWord('')
  }, [status])

  useEffect(() => {
    dispatch(userAction.sido())
  }, [dispatch])

  useEffect(() => {
    dispatch(studyAction.studyList(params))
  }, [params])

  const onSearch = () => {
    const newParams = { ...params, word }
    dispatch(setParams(newParams))
  }

  // 지역
  const sidoChange = sidoId => {
    dispatch(setParams({ ...params, sidoId }))
    dispatch(userAction.gugun(sidoId))
  }
  const gugunChange = gugunId => {
    dispatch(setParams({ ...params, gugunId }))
  }
  const OnKeyChange = value => {
    dispatch(setParams({ ...params, key: value }))
  }
  const OnOrderKeyChange = value => {
    dispatch(setParams({ ...params, orderKey: value }))
  }

  const setOrderBy = () => {
    dispatch(
      setParams({
        ...params,
        orderBy: params.orderBy === 'desc' ? 'asc' : 'desc',
      }),
    )
  }
  const onWordChange = e => {
    setWord(e.target.value)
  }

  const setIsOnline = () => {
    dispatch(setParams({ ...params, isOnline: params.isOnline ? 0 : 1 }))
  }

  return (
    <Row style={{ marginBottom: '15px' }}>
      <Col>
        <Search
          name="word"
          placeholder="검색"
          onSearch={onSearch}
          onChange={onWordChange}
          defaultValue=""
          value={word}
          enterButton
          style={{ width: '500px', margin: '0 10px 10px 0' }}
        />
      </Col>
      <Col>
        <Space wrap>
          {/* 검색 key */}
          <Select
            style={{ width: 120 }}
            name="key"
            onChange={OnKeyChange}
            defaultValue="title"
            options={[
              { value: 'title', label: '제목' },
              { value: 'description', label: '설명' },
              { value: 'leader', label: '리더 닉네임' },
            ]}
          />
          <Select
            style={{ width: 120 }}
            name="orderKey"
            onChange={OnOrderKeyChange}
            defaultValue="createdAt"
            options={[
              { value: 'createdAt', label: '생성순' },
              { value: 'hit', label: '조회순' },
              { value: 'like', label: '좋아요순' },
              { value: 'bookmark', label: '북마크순' },
            ]}
          />

          <Button
            style={{ width: 80 }}
            name="orderBy"
            onClick={setOrderBy}
            defaultValue="title"
          >
            {params.orderBy === 'desc' ? '내림차순' : '오름차순'}
          </Button>

          <Button
            style={{ width: 80 }}
            name="isOnline"
            onClick={setIsOnline}
            defaultValue="title"
          >
            {params.isOnline ? '온라인' : '오프라인'}
          </Button>

          {!params.isOnline && (
            <Select
              onChange={sidoChange}
              defaultValue="도시를 선택해주세요"
              value={
                sido?.[Object.keys(sido).find(key => key === params.sidoId)]
              }
            >
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
            <Select
              onChange={gugunChange}
              defaultValue="상세주소를 선택해주세요"
              value={
                gugun?.[Object.keys(gugun).find(key => key === params.gugunId)]
              }
            >
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
      </Col>
    </Row>
  )
}

export default SearchComponent
