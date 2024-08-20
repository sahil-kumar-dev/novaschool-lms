import React from 'react'
import CtaButton from '../helper/CtaButton'
import BlurIn from '@/components/magicui/blur-in'
import WordPullUp from '@/components/magicui/word-pull-up'
import Image from 'next/image'

const Hero = () => {
    return (
        <section className='min-h-screen pt-20 relative px-4 md:px-0 bg-gradient-to-t from-black/10 to-transparent'>
            <div className="flex flex-col items-center max-w-[950px] mx-auto space-y-6 z-20">
                <div className='p-1 text-[#2c2c2c] rounded-[4px] bg-[#89eb5e] w-fit ' data-aos="zoom-in">
                    <h1 className='uppercase font-bold text-[12px]'>attention</h1>
                </div>
                <BlurIn word="Unlock your Dream Tech Job with our Full-Stack Web Development Cohort" className='text-[#2c2c2c] md:text-[68px] leading-[72px] font-bold tracking-tight text-center z-20' />
                <WordPullUp
                    className='text-[#747474] font-medium text-md md:text-[22px] leading-5 md:leading-8 text-center'
                    words='Become a full-stack developer with expert instructors, practical curriculum, and real-world projects.'
                />
                <div className="space-x-2 md:space-x-4">
                    <CtaButton>
                        Partner with Us
                    </CtaButton>
                    <a href='/#curriculum' className='px-2 md:px-4 py-2 md:py-3 hover:bg-[#111111] bg-white text-black border-2 hover:border-white border-[#d7d7d7] text-[16px] leading-5 hover:text-white font-semibold rounded-[10px] transition-all duration-200'>
                        See Curriculum
                    </a>
                </div>
            </div>
            <Image src={'/assets/herologos/1.svg'} className='z-10 hidden md:block size-16 md:size-20 lg:size-28 absolute lg:left-10' width={100} height={100} alt='company logo'/>
            <Image src={'/assets/herologos/2.svg'} className='z-10 hidden md:block size-16 md:size-20 lg:size-28 absolute right-10 top-10 lg:right-40' width={100} height={100} alt='company logo'/>
            <Image src={'/assets/herologos/3.svg'} className='z-10 hidden md:block size-16 md:size-20 lg:size-28 absolute right-32 lg:bottom-80' width={100} height={100} alt='company logo'/>
            <Image src={'/assets/herologos/4.svg'} className='z-10 hidden md:block size-16 md:size-20 lg:size-28 absolute top-0 lg:bottom-96 left-5 lg:left-40' width={100} height={100} alt='company logo'/>
            <Image src={'/assets/herologos/5.svg'} className='z-10 hidden md:block size-16 md:size-20 lg:size-28 absolute left-1/2 lg:bottom-0 bottom-20' width={100} height={100} alt='company logo'/>
            <Image src={'/assets/herologos/6.svg'} className='z-10 hidden md:block size-16 md:size-20 lg:size-28 absolute right-2 lg:bottom-0 bottom-20' width={100} height={100} alt='company logo'/>
            <Image src={'/assets/herologos/7.svg'} className='z-10 hidden md:block size-16 md:size-20 lg:size-28 absolute left-10 lg:top-48 bottom-0 lg:bottom-20' width={100} height={100} alt='company logo'/>
        </section>
    )
}

export default Hero