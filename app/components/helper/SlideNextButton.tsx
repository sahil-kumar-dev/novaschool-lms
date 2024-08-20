import React from 'react'
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'
import { useSwiper } from 'swiper/react'

const SlideNextButton = () => {
    const swiper = useSwiper()
    return (
        <div className=' px-4 h-[52px] flex justify-end mt-4'>
            <div className=" flex items-center gap-6 ">
                <button onClick={() => swiper.slidePrev()} className='border rounded-2xl text-2xl p-3 border-black text-black'>
                    <FaArrowLeftLong />
                </button>
                <button onClick={() => swiper.slideNext()} className='border rounded-2xl text-2xl p-3 border-black text-black'>
                    
                    <FaArrowRightLong />
                </button>
            </div>
        </div>
    )
}

export default SlideNextButton