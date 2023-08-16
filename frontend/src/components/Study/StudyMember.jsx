import React from 'react'
import { List } from 'antd'
import UserName from './UserName'

export default function StudyMember({ members }) {
  console.log(members)

  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={members}
        renderItem={(member, index) => (
          <List.Item>
            <List.Item.Meta
              title={
                <div>
                  스터디원 {index + 1} <UserName user={member} />
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
    // <div className="big_box">
    //   <Table dataSource={dataSource} columns={columns} />
    //   <h1>회원정보</h1>
    //   {/* <Table dataSource={members} columns={members} /> */}
    //   {members?.map(member => (
    //     <div>
    //       <Link to={`/user_edit/${member?.id}`} state={{ userId: member?.id }}>
    //         {member.nickname}
    //         {member.description}
    //         {member.score}
    //       </Link>
    //     </div>
    //   ))}
    // </div>
  )
}
