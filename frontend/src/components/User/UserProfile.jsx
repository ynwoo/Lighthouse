import Sider from 'antd/es/layout/Sider'
import { useNavigate } from 'react-router-dom'
import { Avatar, Card } from 'antd'
import UserStarRating from '../atoms/UserStarRating'
import { profileImage } from '../../utils'
import UserBadge from './UserBadge'

const UserProfile = ({ userProfile, children }) => {
  const navigate = useNavigate()

  const handleMoveProfile = userProfileId => () => {
    navigate(`/user_edit/${userProfileId}`, {
      state: { userId: userProfileId },
    })
  }

  return (
    <Sider
      style={{
        background: 'rgb(255, 255, 255)',
      }}
      width={200}
    >
      <Card bordered={false}>
        <Avatar
          size={{
            sm: 100,
            md: 150,
            lg: 150,
            xl: 150,
            xxl: 150,
          }}
          onClick={handleMoveProfile(userProfile.id)}
          src={profileImage(userProfile.profileImgUrl)}
          shape="circle"
        />
        <h3 style={{ marginBottom: '0px' }}>
          {userProfile.nickname}
          <UserBadge badges={userProfile?.badges?.slice(0, 5)} />
        </h3>
        <UserStarRating score={userProfile.score} />
        {children}
      </Card>
    </Sider>
  )
}

export default UserProfile
