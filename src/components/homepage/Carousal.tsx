import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

interface CarouselType {
    id: number,
    src: string,
}
interface CarousalProps {
  images: CarouselType[];
}


const Carousel = ({ images }: CarousalProps) => {
  return (
    <div className="container mx-auto w-full">
      <Swiper modules={[Autoplay, Pagination]}
        slidesPerView={1}
        loop
        speed={300}
        autoplay={{
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
        }} className="rounded-2xl">
          
          {images.map((image) => 
          <SwiperSlide key={image.id}>
            <img src={image.src} width={1700} height={550} className="w-full rounded-2xl object-cover"/>
          </SwiperSlide>)}
          </Swiper>
    </div>
  )
}
export default Carousel;