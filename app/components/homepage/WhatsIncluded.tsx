import React from 'react'
import { FaCheck } from 'react-icons/fa6'
import WhatWeOffer from './WhatWeOffer'

const WhatsIncludedData = [
    'Get Advanced Certificate Programme from Vertocity without quitting your job.',
    'Practical Learning with Industry Projects and Case Studies',
    'Dedicated Student support team from Vertocity',
    'Networking opportunities with our+ alumni & leading industry experts',
    'Rigorous Cutting Edge Curriculum developed in Collaboration with Teaching experts and Industry leaders in DevOps',
]

const WhatsIncluded = () => {
    return (
        <section className='content-border' id='pricing'>
            <WhatWeOffer/>
            <div className="content mt-4 md:mt-10">
                <div className="p-5 lg:p-10 rounded-[30px] bg-primary flex justify-between flex-col lg:flex-row gap-4 lg:gap-0">

                    <div className="w-full lg:w-5/12 space-y-5">
                        <div className='p-1 bg-[#dfdfdf] rounded-[4px] text-black w-fit'>
                            <h1 className='uppercase font-bold text-[12px]'>features & benefits</h1>
                        </div>

                        <h1 className="heading">What&apos;s Included in this Pricing</h1>
                        <p className='font-medium text-[16px] leading-6 text-secondary'>Over 2,300 students have completed this course and started working at their dream job, whats stopping you?</p>
                    </div>
                    <div className="w-full lg:w-5/12 space-y-3">
                        {
                            WhatsIncludedData.map((item, idx) => (
                                <div key={idx} className="text-black flex gap-5 items-start justify-normal">
                                    <FaCheck className='text-lg min-w-4' />
                                    <p className='text-[16px] leading-6 font-medium'>{item}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WhatsIncluded