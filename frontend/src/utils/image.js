const image = imgUrl => {
  return imgUrl && process.env.REACT_APP_CLOUDFRONT_DOMAIN_URL + imgUrl
}

const profileImage = imgUrl => {
  if (!imgUrl) {
    return '/profile.jpg'
  }
  return imgUrl.startsWith('https') ? imgUrl : image(imgUrl)
}

const coverImage = imgUrl => {
  if (!imgUrl) {
    return 'https://s24953.pcdn.co/blog/wp-content/uploads/2018/01/Templates-Guide-header-1-1024x576.png'
  }
  return imgUrl.startsWith('https') ? imgUrl : image(imgUrl)
}
export { profileImage, image, coverImage }
