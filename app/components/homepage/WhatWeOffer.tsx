import WhatWeOfferData from '@/data/WhatWeOfferData'
import React from 'react'
import Chip from '../helper/Chip'
import { MdOutlineErrorOutline } from 'react-icons/md'

const WhatWeOffer = () => {
    return (
        <div className='content space-y-6 md:space-y-0'>

            <h1 className='text-[26px] leading-8 tracking-tight font-bold md:hidden text-black'>Simple & transparent</h1>

            <div className="justify-between hidden md:flex">
                <div className="p-8 pl-0 space-y-9">
                    <div className="h-28 ">
                        <h1 className='font-bold text-[40px] leading-[48px] tracking-tight text-black'>Simple & transparent </h1>
                    </div>
                    <div className="space-y-5 ">
                        {
                            WhatWeOfferData.map(({ id, keyPoints }) => (
                                <div key={id} className="text-[16px] leading-6 font-bold text-[#111111] h-[50px] flex gap-2">
                                    <p>
                                        {keyPoints[0]}
                                    </p>
                                    <span className='mt-1'>
                                        <MdOutlineErrorOutline />
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="bg-[#f5f5f5] rounded-[30px] p-8 max-w-[400px] space-y-9">
                    <div className="h-28 border-b-2 border-gray-200">
                        <h1 className='text-[26px] leading-8 tracking-tight font-bold text-black'>What Nova School<br /> Offers</h1>
                    </div>
                    <div className="space-y-5">
                        {
                            WhatWeOfferData.map(({ id, keyPoints }) => (
                                <p key={id} className="text-[16px] leading-6 font-medium text-[#111111] h-[50px]">
                                    {keyPoints[1]}
                                </p>
                            ))
                        }
                    </div>
                </div>
                <div className=" p-8 pr-0 space-y-9 hidden lg:block">
                    <div className="h-28 border-b-2 border-gray-200">
                        <h1 className='text-[26px] leading-8 tracking-tight font-bold text-black'>Other Coaching <br /> Offers</h1>
                    </div>
                    <div className="space-y-5">
                        {
                            WhatWeOfferData.map(({ id, keyPoints }) => (
                                <p key={id} className="text-[16px] leading-6 font-medium text-[#111111] h-[50px]">
                                    {keyPoints[2]}
                                </p>
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className="rounded-[30px] bg-[#f5f5f5] p-6 md:hidden space-y-8">
                <div className="border-b-2 pb-8">
                    <h1 className='text-[26px] leading-8 tracking-tight font-bold '>What Nova School Offers</h1>
                </div>
                <div className="space-y-7">
                    {
                        WhatWeOfferData.map(({ id, keyPoints }) => (
                            <div key={id} className="space-y-1">
                                <h2 className='flex items-center gap-1'>
                                    <span className='text-[16px] leading-6 font-bold text-[#111111]'>
                                        {keyPoints[0]}
                                    </span>
                                    <span className='mt-1'>
                                        <MdOutlineErrorOutline />
                                    </span>
                                </h2>
                                <p className='text-[16px] leading-6 font-medium text-[#111111]'>
                                    {keyPoints[1]}
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>
    )
}

export default WhatWeOffer