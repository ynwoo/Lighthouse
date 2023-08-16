import React from 'react'
import { Link } from 'react-router-dom'
import { image } from '../../utils/index'

function UserName({ user }) {
  return (
    <span>
      <Link to={`/user_edit/${user?.id}`} state={{ userId: user?.id }}>
        {user ? user.nickname : `로딩중`}
      </Link>
      {user?.badges && (
        <img
          src={image(user?.badges[0]?.imgUrl)}
          alt={user.badges[0]?.description}
          className="badge"
        />
      )}
    </span>
  )
}

export default UserName
