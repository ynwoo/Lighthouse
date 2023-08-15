// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faStar } from '@fortawesome/free-solid-svg-icons'
import './UserStarRating.css'

const UserStarRating = ({ score }) => {
  const width = `${score}%`
  //   const star = <FontAwesomeIcon icon={faStar} bounce />
  return (
    <div className="star-ratings">
      <div className="star-ratings-fill" style={{ width }}>
        <span>★★★★★</span>
      </div>
      <div className="star-ratings-base">
        <span>★★★★★</span>
      </div>
    </div>
  )
}

export default UserStarRating
