import React from 'react'
import { Table } from 'antd'
import { Link } from 'react-router-dom'

export default function StudyMember({ members }) {
  console.log(members)
  const dataSource = members?.map(member => {
    return {
      key: member.id,
      nickname: (
        <Link to={`/user/${member?.id}`} state={{ userId: member?.id }}>
          {member.nickname}
        </Link>
      ),
      description: member.description,
      score: member.score,
    }
  })

  const columns = [
    {
      title: '닉네임',
      dataIndex: 'nickname',
      key: 'nickname',
    },
    {
      title: '자기소개',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '점수',
      dataIndex: 'score',
      key: 'score',
    },
  ]

  return (
    <div className="big_box">
      <Table dataSource={dataSource} columns={columns} />
      <h1>회원정보</h1>
      {/* <Table dataSource={members} columns={members} /> */}
      {members?.map(member => (
        <div>
          <Link to={`/user/${member?.id}`} state={{ userId: member?.id }}>
            {member.nickname}
            {member.description}
            {member.score}
          </Link>
        </div>
      ))}
    </div>
  )
}
