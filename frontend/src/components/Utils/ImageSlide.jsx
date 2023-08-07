import React, { useState, useRef } from 'react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import SwiperCore, {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
  Controller,
} from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

SwiperCore.use([Autoplay, EffectCoverflow, Navigation, Pagination, Controller])

function ImageSlide({ imageData }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const swiperRef = useRef(null)

  const handleChange = index => {
    setCurrentIndex(index)
  }

  const handlePrevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev()
    }
  }

  const handleNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext()
    }
  }

  return (
    <div className="swiper-container">
      <div className="flex justify-center items-center py-5 px-3 relative">
        <Swiper
          effect="coverflow"
          modules={[EffectCoverflow, Pagination, Navigation]}
          grabCursor
          centeredSlides
          loop
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={{ el: '.swiper-pagination', clickable: true }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          onSlideChange={swiper => handleChange(swiper.realIndex)}
          ref={swiperRef}
          className="mySwiper"
        >
          {imageData.map(image => (
            <SwiperSlide key={image.id} style={{ width: '300px' }}>
              <button // <div> 대신 <button>을 사용합니다.
                type="button"
                style={{
                  flexGrow: 5,
                  backgroundImage: `url(${image.url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  display: 'none',
                }}
                onClick={() => console.log('클릭됨')}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    console.log('Enter 키 눌림')
                  }
                }}
                tabIndex={0}
                aria-label="이미지 슬라이드" // 이미지 슬라이드에 대한 설명적인 레이블을 제공합니다.
              />
              {image.card}
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="slider-controler">
          <div
            className="swiper-button-prev slider-arrow"
            onClick={handlePrevSlide}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handlePrevSlide()
              }
            }}
            aria-label="이전 슬라이드"
            role="button"
            tabIndex={0}
          />
          <div
            className="swiper-button-next slider-arrow"
            onClick={handleNextSlide}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleNextSlide()
              }
            }}
            aria-label="다음 슬라이드" // 제어 요소에는 설명적인 레이블을 제공합니다.
            role="button" // 제어 요소에 적절한 role을 추가합니다.
            tabIndex={0} // 포커스를 받을 수 있도록 tabIndex를 추가합니다.
          />
        </div>
      </div>
      <div className="text-center mt-10">
        <p>
          현재 슬라이드: {currentIndex + 1} / {imageData.length}
        </p>
      </div>
    </div>
  )
}

export default ImageSlide
