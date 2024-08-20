'use client'

import Image from 'next/image';
import { useRef } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import Slider from "react-slick";
// import "slick-carousel/slick/slick-theme.css";
// import "slick-carousel/slick/slick.css";
import Chip from '../helper/Chip';

const Projects = () => {
    const sliderRef = useRef<Slider | null>(null); // Specify the type for the ref

    const next = () => {
        sliderRef.current?.slickNext(); // Use optional chaining
    };
    const previous = () => {
        sliderRef.current?.slickPrev(); // Use optional chaining
    };

    const settings = {
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        slidesMargin: 20,
        autoplay: true,
        autoplaySpeed: 4000,
        rtl: true,
        centerMode: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerMode: false,
                }
            }
        ]
    }
    return (
        <section id='projects' className='content-border'>
            <div className="content space-y-7 ">
                <div className="flex items-center justify-center gap-2 flex-col">
                    <Chip>
                        projects
                    </Chip>
                    <h1 data-aos="fade-up" className="heading text-center">Projects done by <br /> Our Students</h1>
                </div>
                <div className="border border-[#d6d6d6] rounded-[30px] py-4 lg:py-10 relative">
                    <Slider
                        {...settings}
                        ref={sliderRef} // Directly assign the ref
                    >
                        {Array(4).fill(0).map((_, index) => (
                            <div key={index} className="h-[430px]">
                                <div className="max-w-[400px] mx-auto space-y-5 w-11/12 border h-full rounded-2xl flex items-center justify-center">
                                    {/* <div className="rounded-[30px] bg-[#f5f5f5] h-[270px] w-full flex items-end justify-center">
                                        <Image
                                            src={'/assets/project.png'}
                                            width={300}
                                            height={300}
                                            alt='project'
                                        />
                                    </div>
                                    <div className='max-w-[350px] mx-auto w-full'>
                                        <h3 className='font-bold text-xl lg:text-[30px] leading-9 text-[#2c2c2c] text-center'>Monster Game</h3>
                                        <p className='font-medium text-xs lg:text-[16px] lg:leading-6 text-center text-[#747474]'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint quibusdam illo, iure rem voluptas vero. Officia deleniti tenetur, repellat repellendus cupiditate similique dolorum eligendi minima!</p>
                                    </div> */}
                                    <h1 className='text-2xl md:text-4xl font-bold'>Coming Soon...</h1>
                                </div>
                            </div>
                        ))}
                    </Slider>
                    <div className="flex gap-0.5 absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                        <button className='bg-[#2c2c2c] hover:bg-[#9b9b9b] rounded-[10px_0px_0px_10px] text-white text-lg font-extrabold p-2' onClick={previous}>
                            <FaAngleLeft />
                        </button>
                        <button className='bg-[#2c2c2c] hover:bg-[#9b9b9b] rounded-[0_10px_10px_0] text-white text-lg font-extrabold p-2'  onClick={next}>
                            <FaAngleRight />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Projects