import { image } from '../../utils'

const UserBadge = ({ badges }) => {
  return badges?.map(badge => (
    <img src={image(badge.imgUrl)} alt={badge.description} className="badge" />
  ))
}

export default UserBadge
