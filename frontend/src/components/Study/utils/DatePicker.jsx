// DateRangePicker.jsx
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styled from 'styled-components'
import StringToDate from '../../../utils/FormateStringToDate'

const DatePickerContainer = styled.div`
  .react-datepicker-wrapper,
  .react-datepicker__input-container,
  .react-datepicker__input-container input {
    // border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px;
    font-size: 16px;
  }

  .react-datepicker {
    font-family: 'Arial', sans-serif;
  }

  .react-datepicker__header {
    background-color: #c4e3ff;
    border-bottom: 1px solid white;
    // padding-top: 8px;
  }

  .react-datepicker__day-name,
  .react-datepicker__day {
    width: 40px;
    line-height: 40px;
    text-align: center;
  }

  .react-datepicker__day--selected {
    background-color: #c4e3ff;
    color: #c4e3ff;
  }

  .react-datepicker__day--keyboard-selected {
    background-color: #007bff;
    color: #fff;
  }

  .react-datepicker__day--in-selecting-range,
  .react-datepicker__day--in-range {
    background-color: #007bff;
    color: #fff;
  }
`

function DateRangePicker({
  changeStartDate,
  changeEndDate,
  initStartDate,
  initEndDate,
}) {
  const [startDate, setStartDate] = useState(
    initStartDate ? StringToDate(initStartDate) : null,
  )
  const [endDate, setEndDate] = useState(
    initEndDate ? StringToDate(initEndDate) : null,
  )

  const handleStartDateChange = date => {
    setStartDate(date)
    changeStartDate(date)
  }

  const handleEndDateChange = date => {
    setEndDate(date)
    changeEndDate(date)
  }

  return (
    <DatePickerContainer>
      <DatePicker
        selected={startDate}
        onChange={handleStartDateChange}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText="시작 날짜"
      />
      <br />
      <DatePicker
        selected={endDate}
        onChange={handleEndDateChange}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        placeholderText="종료 날짜"
      />
      {startDate && endDate && (
        <div>
          <p>선택한 기간</p>
          <p>시작 날짜: {startDate.toLocaleDateString()}</p>
          <p>종료 날짜: {endDate.toLocaleDateString()}</p>
        </div>
      )}
    </DatePickerContainer>
  )
}

export default DateRangePicker
