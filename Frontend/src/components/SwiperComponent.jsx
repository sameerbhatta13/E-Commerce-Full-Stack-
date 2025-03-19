import React from 'react'
import slide1 from '../../public/dharara.jpg';
import slide2 from '../../public/dharara1.jpg';
import slide3 from '../../public/main.jpg';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import '../styles/swiper-custom.css';


const SwiperComponent = () => {
    const slideStyle = {
        width: '100%',
        height: '500px',
        objectFit: 'cover',
        borderRadius: '10px',
    };
    return (
        <>
            <div className="swiper-container dark:bg-black bg-red-500">
                <Swiper
                    modules={[Navigation, Pagination, EffectCoverflow]}
                    effect="coverflow"
                    grabCursor={true}
                    centeredSlides={true}
                    loop={true}
                    spaceBetween={50}
                    slidesPerView={3}
                    coverflowEffect={{
                        rotate: 30,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    navigation={{
                        nextEl: '.custom-swiper-button-next',
                        prevEl: '.custom-swiper-button-prev',
                    }}
                    pagination={{ clickable: true }}
                >
                    <SwiperSlide>
                        <div className="slide-wrapper">
                            <img src={slide1} alt="Slide 1" style={slideStyle} />
                            <div className="slide-caption">Dharara Tower</div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="slide-wrapper">
                            <img src={slide2} alt="Slide 2" style={slideStyle} />
                            <div className="slide-caption">Historical Monument</div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="slide-wrapper">
                            <img src={slide3} alt="Slide 3" style={slideStyle} />
                            <div className="slide-caption">Nepal Heritage</div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="slide-wrapper">
                            <img src={slide3} alt="Slide 3" style={slideStyle} />
                            <div className="slide-caption">Nepal Heritage</div>
                        </div>
                    </SwiperSlide>
                    {/* Custom Navigation Buttons */}

                    <div className="custom-swiper-button-next">Next➡️</div>
                    <div className="custom-swiper-button-prev">⬅️ Prev</div>
                </Swiper>

            </div>

            {/* Product List Section */}
            <div className="product-section">
                <h2>Featured Products</h2>
            </div>


        </>
    )
}

export default SwiperComponent