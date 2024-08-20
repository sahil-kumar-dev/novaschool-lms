import React from 'react'
import Chip from '../helper/Chip'
import Image from 'next/image'
import Marquee from '@/components/magicui/marquee'
import { techStacks } from './Tools'

const HiringPartners = () => {

    const hiringPartnersLogo = [
         'bigbasket',
         'byjus',
         'cashfree',
         'kreditbee',
         'licious',
         'rapido',
         'razorpay',
         'yourstory',
         'zoomcar',
    ]

    return (
        <div className='content-border'>
            <div className="content">
                <div className="flex items-center justify-center gap-2 flex-col">
                    <Chip>
                        hiring partners
                    </Chip>
                    <h1 data-aos="fade-up" className="heading text-center">Our Potential hiring partners</h1>
                </div>
                <div className="mt-10">
                    <div className="flex flex-wrap justify-center gap-10 items-center mt-10 relative">
                        <Marquee pauseOnHover className='[--duration:20s]'>
                            {
                                hiringPartnersLogo.map((tech,idx) => (
                                    <div key={idx} className="bg-white rounded-2xl p-6 flex items-center flex-col gap-4 w-48">
                                        <Image
                                            src={`/assets/hiringpartners/${tech}.svg`}
                                            alt={tech}
                                            width={200}
                                            height={200}
                                            className='object-contain w-full aspect-video'
                                        />
                                        {/* <h1 className='text-black font-bold text-xl'>{tech.name}</h1> */}
                                    </div>
                                ))
                            }
                        </Marquee>
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white "></div>
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white "></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HiringPartners