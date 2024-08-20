import React from 'react'
import Chip from '../helper/Chip'
import BoxReveal from '@/components/magicui/box-reveal'
import { OrbitingIcons } from './OrbitingIcons'


const OverViewData = [
    { id: 1, height: '120px', text: 'Front-End', bg_color: '#ffaf00' },
    { id: 2, height: '167px', text: 'Back-End', bg_color: '#ffcb0b' },
    { id: 3, height: '227px', text: 'Full Stack Development', bg_color: '#ff5c29' },
    { id: 4, height: '260px', text: 'Web Server', bg_color: '#ff8c40' },
    { id: 5, height: '302px', text: 'Operating System', bg_color: '#EB6E1B' },
]

const Overview = () => {
    return (
        <section className='content-border' id='overview'>
            <div className="content space-y-10 md:space-y-20">
                <h1 className="heading text-center" data-aos="fade-up">Check out and join hands</h1>
                <div className="flex justify-between flex-col lg:flex-row gap-5 lg:gap-0">
                    <div className="lg:w-1/2 pr-8 space-y-2">
                        <Chip>overview</Chip>
                        <div className="space-y-5">
                            <BoxReveal duration={0.5} boxColor='#f5f5f5'>
                                <h1 className="heading">About Full Stack Web Development Program</h1>
                            </BoxReveal>
                            <BoxReveal duration={0.5} boxColor='#f5f5f5'>
                                <p className="desc">Gain expertise in full stack web development with our certificate program. Master advanced web programming to become a versatile full stack web developer.</p>
                            </BoxReveal>
                            <BoxReveal duration={0.5} boxColor='#f5f5f5'>
                                <p className="desc">
                                    Our program covers both front-end and back-end development, taught by industry experts and mentors. Benefit from 24/7 student support and gain lifetime access to our international learning community.</p>
                            </BoxReveal>
                        </div>
                    </div>
                    {/* <div className="rounded-[30px] bg-[#f5f5f5] flex items-end justify-evenly lg:w-1/2 px-4 pt-8 overflow-hidden">
                        {OverViewData.map(({ id, text, bg_color, height }) => (
                            <div data-aos="fade-up" data-aos-delay={id * 200} key={id} className=" flex w-[50px] lg:w-16 rounded-[16px_16px_0_0] lg:rounded-[20px_20px_0_0] justify-center pb-5" style={{ backgroundColor: bg_color, color: 'white', height: height }}>
                                <p className='font-semibold text-[12px] lg:text-[16px] text-ort rotate-180'>{text}</p>
                            </div>
                        ))}
                    </div> */}
                    <OrbitingIcons/>
                </div>
            </div>
        </section>
    )
}

export default Overview