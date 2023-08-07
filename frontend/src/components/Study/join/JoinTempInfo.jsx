import React from 'react'
import { Table } from 'antd'

// 템플릿 상세의 인원정보(멤버)

export default function TempMember() {
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
    },
    {
      key: '2',
      name: 'John',
    },
  ]

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
  ]
  return (
    <div className="big_box">
      <div className="review_box">
        <div>
          <div className="review_mini2">
            <div>스터디 이름</div>
            <div className="review_mini">응애</div>
          </div>
          <div className="review_mini2">
            <div>설명</div>
            <div className="review_mini">응애</div>
          </div>
          <div className="review_mini2">
            <div>총원</div>
            <div className="review_mini">응애</div>
          </div>
          <div className="review_mini2">
            <div> ?? </div>
            <div className="review_mini">응애</div>
          </div>
          <div className="review_mini2">
            <div>날짜</div>
            <div className="review_mini">응애</div>
          </div>
        </div>

        <div>
          참여인원
          <Table dataSource={dataSource} columns={columns} />
        </div>
      </div>
    </div>
  )
}
