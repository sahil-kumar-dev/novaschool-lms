import { FooterLinks, SocialLinks } from '@/data/LinksData'
import Image from 'next/image'
import React from 'react'
import { FaArrowRight } from 'react-icons/fa6'

const Footer = () => {

    return (
        <footer className='bg-[#111111]'>
            <div className="content">
                <div className="flex justify-between flex-col md:flex-row py-8 md:py-16">
                    <div className="flex flex-col justify-between gap-4 md:gap-0">
                        <div className="space-y-4 md:space-y-6">
                            <Image
                                src={'/assets/footerlogo.png'}
                                width={100}
                                height={100}
                                alt='footer logo'
                            />
                            <p className='text-[#989898] font-medium text-[16px] leading-6'>Design better future with us</p>
                        </div>
                        <div className="flex gap-2">
                            <span className='text-white text-lg -rotate-45 block'>
                                <FaArrowRight />
                            </span>
                            <a href='mailto:raviranjan@novaschool.co.in' className='font-bold text-[16px] leading-6 text-[#e7e7e7]'>raviranjan@novaschool.co.in</a>
                        </div>
                    </div>
                    <div className="flex gap-20 mt-10 md:mt-0">
                        <div className="flex flex-col gap-[6px]">
                            {
                                FooterLinks.map(({ id, label, path }) => (
                                    <a key={id} href={path} className='font-bold text-[16px] leading-6 text-[#e7e7e7]'>{label}</a>
                                ))
                            }
                        </div>
                        <div className="flex flex-col gap-[6px]">
                            {
                                SocialLinks.map(({ id, label, path }) => (
                                    <a target='_blank' key={id} href={path} className='font-bold text-[16px] leading-6 text-[#e7e7e7]'>{label}</a>
                                ))
                            }
                        </div>
                    </div>
                </div>

                <div className="border-t border-[#989898]/60 py-4 md:py-10 flex justify-between flex-col md:flex-row gap-4 md:gap-0 text-center">  
                    <div className="text-sm md:text-[16px]  leading-6 font-medium text-white">
                        Copyright &copy; 2024 Nova School
                    </div>
                    <div className="text-sm md:text-[16px] leading-6 font-medium text-white">
                        Privacy | Terms and Conditions | Cookies
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer