const dateToString = date => {
  return `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getMilliseconds()}`
}

const startDateToString = date => {
  return `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} 00:00:00`
}

const endDateToString = date => {
  return `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} 23:59:59`
}

export { dateToString, startDateToString, endDateToString }
