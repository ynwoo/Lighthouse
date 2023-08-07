import React from 'react'
import SwiperCore, { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import photo1 from '../static/IMG1.png'

// Install modules
SwiperCore.use([Navigation])

function Slider() {
  return (
    <div
      className="slidebox"
      style={{
        maxWidth: '1000px',
        marginLeft: '350px',
        textAlign: 'center',
        // backgroundImage: 'linear-gradient(to bottom, #74a3ff, #ffffff 25%)',
      }}
    >
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop
        autoplay={{ delay: 2000 }}
        style={{
          width: '2000px',
          maxWidth: '100%',
          height: '400PX',
          top: '-60px',
        }}
      >
        <SwiperSlide>
          <img src={photo1} alt="Slide 1" style={{ maxWidth: '100%' }} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={photo1} alt="Slide 2" style={{ maxWidth: '100%' }} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={photo1} alt="Slide 3" style={{ maxWidth: '100%' }} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={photo1} alt="Slide 4" style={{ maxWidth: '100%' }} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={photo1} alt="Slide 5" style={{ maxWidth: '100%' }} />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default Slider
