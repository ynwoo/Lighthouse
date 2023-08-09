const dateToString = date => {
  return date?.getFullYear()
    ? `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getMilliseconds()}`
    : null
}

const startDateToString = date => {
  console.log(date)
  return date?.getFullYear()
    ? `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 00:00:00`
    : null
}

const endDateToString = date => {
  return date?.getFullYear()
    ? `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 23:59:59`
    : null
}

export { dateToString, startDateToString, endDateToString }
