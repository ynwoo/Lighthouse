const image = imgUrl => {
  return imgUrl && process.env.REACT_APP_S3_DOMAIN_URL + imgUrl
}

const profileImage = imgUrl => {
  if (!imgUrl) {
    return '/profile.jpg'
  }
  return imgUrl.startsWith('https') ? imgUrl : image(imgUrl)
}

export { profileImage, image }
