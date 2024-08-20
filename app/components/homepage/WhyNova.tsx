import React from 'react'
import Chip from '../helper/Chip'
import CtaButton from '../helper/CtaButton'
import { FaPlus } from 'react-icons/fa6'
import BoxReveal from '@/components/magicui/box-reveal'

const keyPoints = [
    'Highly Affordable',
    'Curriculum',
    'Project based learning',
    'Proper guidance',
    '100% Job Oriented',
    'Various Programs'
]

const WhyNova = () => {
    return (
        <section className='content-border overflow-hidden' id='whynovaschool'>
            <div className="content flex justify-between flex-col md:flex-row">
                <div className="md:w-6/12 space-y-[10px] md:space-y-4">
                    <Chip>why nova school program</Chip>
                    <BoxReveal boxColor='#f5f5f5'>
                        <h1 className="heading">An interactive and Project Based Learning Experience</h1>
                    </BoxReveal>
                    <BoxReveal boxColor='#f5f5f5'>
                        <p className='desc'>Learn Web Development from leading mentors who worked with brands like, Iopex, Fynd, Amazon, Cognizant, HSBC, JPMC, Wells Fargo, Wipro.</p>
                    </BoxReveal>
                    <div className="">
                        <CtaButton>
                            Partner with Us
                        </CtaButton>
                    </div>
                </div>
                <div className="md:w-5/12">
                    {
                        keyPoints.map((item, idx) => (
                            <div className="px-5 md:px-9 py-6 border-b border-[#989898]/40 flex justify-between" data-aos="fade-left" data-aos-delay={idx * 50} key={idx}>
                                <h1 className='font-bold text-[16px] leading-6 text-[#111111]'>{item}</h1>
                                <FaPlus />
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default WhyNova