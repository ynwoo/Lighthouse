import React from 'react'
// import { Table } from 'antd'
import { Link } from 'react-router-dom'

export default function StudyMember({ members }) {
  console.log(members)
  // const dataSource = [
  //   {
  //     key: '1',
  //     name: 'Mike',
  //   },
  //   {
  //     key: '2',
  //     name: 'John',
  //   },
  // ]

  // const columns = [
  //   {
  //     title: 'Name',
  //     dataIndex: 'name',
  //     key: 'name',
  //   },
  // ]

  return (
    <div className="big_box">
      <h1>회원정보</h1>
      {/* <Table dataSource={members} columns={members} />; */}
      {members?.map(member => (
        <div>
          <Link to={`/user/${member?.id}`} state={{ userId: member?.id }}>
            {member.nickname}
          </Link>
        </div>
      ))}
    </div>
  )
}
