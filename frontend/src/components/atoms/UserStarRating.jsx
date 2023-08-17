import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './UserStarRating.css'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const UserStarRating = ({ score }) => {
  const width = `${score ?? 0}%`
  const stars = []
  // eslint-disable-next-line no-plusplus
  for (let index = 1; index <= 5; index++) {
    stars.push(<FontAwesomeIcon id={`star-${index}`} icon={faStar} />)
  }
  console.log(width)
  return (
    <div className="star-ratings">
      <div className="star-ratings-fill" style={{ width }}>
        {stars}
      </div>
      <div className="star-ratings-base">{stars}</div>
    </div>
  )
}

export default UserStarRating
