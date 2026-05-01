"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Navigation, Pagination } from 'swiper/modules';


export default function MySlider({
    slidesPerView,
    pageList,
}: {
    slidesPerView: number;
    pageList: {
        id: number;
        img: string;
        title: string;
        desc: string;
    }[];
}) {
    return (
        <Swiper modules={[Navigation, Pagination]}
            spaceBetween={50}
            loop
            slidesPerView={slidesPerView}
            navigation
            pagination={{ clickable: true ,renderBullet(index ,className){
                return`<span class=${className} bg-white! w-5! rounded-3xl! h-5!></span>`
            },bulletActiveClass:'bg-white! w-5! opacity-100! w-10! rounded-3xl!'}}
                
            

            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)

            }>
            {pageList.map((slide) => (
                <SwiperSlide key={slide.id}>
                    <div className="relative w-full h-[400px]">
                        <Image
                            src={slide.img}
                            alt="slide"
                            fill
                            className="object-cover"
                        />

                        <div className="absolute inset-0 bg-green-900/70"></div>

                        <div className="absolute inset-0 flex flex-col justify-center items-start px-10 text-white z-10 gap-3">
                            <h2 className="text-3xl font-bold">{slide.title}</h2>

                            <p className="text-base max-w-md opacity-90">
                                {slide.desc}
                            </p>

                            <div className="flex gap-3 mt-2">
                                <button className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-md text-white">
                                    Shop Now
                                </button>

                                <button className="border border-white px-5 py-2 rounded-md text-white hover:bg-white hover:text-black transition">
                                    View Deals
                                </button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}