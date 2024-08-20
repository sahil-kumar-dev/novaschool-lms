import React from 'react'
import Chip from '../helper/Chip'
import Image from 'next/image'
import CareerPathData from '@/data/CareerPathData'
import BoxReveal from '@/components/magicui/box-reveal'

const CareerPathCard = ({ thumbnail, title, description }: { thumbnail: string, title: string, description: string }) => {
    return (
        <>
            <div className="border border-[#989898]/60 p-4 md:p-5 rounded-[30px] space-y-6 bg-primary md:w-[420px] lg:sticky top-4 ">
                <Image
                    src={thumbnail}
                    height={250}
                    width={500}
                    alt='thumbnail'
                    className='rounded-[16px]'
                />
                <div className="space-y-3">
                    <BoxReveal duration={0.5} boxColor='#f5f5f5'>
                        <h1 className='text-[#2c2c2c] font-bold text-[22px] md:text-[30px] leading-9'>{title}</h1>
                    </BoxReveal>
                    <BoxReveal duration={0.5} boxColor='#f5f5f5'>
                        <p className='desc'>{description}</p>
                    </BoxReveal>
                </div>
            </div>
        </>
    )
}

const CareerPath = () => {
    return (
        <section className='content-border' id='careerpath'>
            <div className="content flex justify-between relative flex-col md:flex-row">
                <div className="space-y-3 md:space-y-5 md:w-5/12 h-fit lg:sticky top-4">
                    <Chip>
                        career path
                    </Chip>
                    <BoxReveal duration={0.5} boxColor='#f5f5f5'>
                        <h1 className="heading">Careers after the Full Stack Program</h1>
                    </BoxReveal>
                    <BoxReveal duration={0.5} boxColor='#f5f5f5'>
                        <p className='desc'>Our learn-by-doing pedagogy ensures you'll pick up skills you need to kickstart or accelerate your career, super fast. To make learning enjoyable and achievable, we've curated a learning career path to help support your growth.</p>
                    </BoxReveal>
                </div>
                <div className="space-y-10 md:space-y-20 mt-6 md:mt-0">
                    {
                        CareerPathData.map((data) => (
                            <CareerPathCard {...data} key={data.id} />
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default CareerPath