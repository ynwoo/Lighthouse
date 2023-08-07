import React from 'react'
import { Table } from 'antd'

export default function TempQnA() {
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
      <h1>회원정보</h1>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  )
}
