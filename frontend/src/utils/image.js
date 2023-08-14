const profileImage = imgUrl => {
  if (!imgUrl) {
    return '/profile.jpg'
  }
  return imgUrl.startsWith('https') ? imgUrl : this.image(imgUrl)
}

const image = imgUrl => {
  return imgUrl && process.env.REACT_APP_S3_DOMAIN_URL + imgUrl
}

export { profileImage, image }
