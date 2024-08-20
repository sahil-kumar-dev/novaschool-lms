'use client'

import InstructorData from '@/data/InstructorData'
import BoxReveal from '@/components/magicui/box-reveal'
import Image from 'next/image'
import { useState } from 'react'
import 'swiper/css'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import Chip from '../helper/Chip'
import SlideNextButton from '../helper/SlideNextButton'

interface mentor {
	name: string,
	jobrole: string,
	currentworkingcompany: string,
	linkedinurl: string,
	instructorimg: string
}

const MentorCard = ({ name, jobrole, currentworkingcompany, linkedinurl, instructorimg }: mentor) => {

	const [isDown, setIsDown] = useState(false)

	return (
		<>
			<div 
				className={`border border-[#989898]/60 rounded-[20px] overflow-hidden ${isDown ? 'cursor-grabbing' : 'cursor-grab'}`} 
				onMouseDown={() => setIsDown(true)}
				onMouseUp={() => setIsDown(false)}
				onMouseLeave={() => setIsDown(false)}
			>
				<div className="">
					<Image
						src={instructorimg}
						width={350}
						height={350}
						className='object-cover w-full object-top'
						alt={name}
					/>
				</div>
				<div className="py-4 px-5 flex flex-col justify-between h-36">
					<div className="">
						<h1 className='font-bold leading-8 text-[24px] text-[#2c2c2c]'>{name}</h1>
						<h3 className='desc'>{jobrole}</h3>
					</div>
					<div className="flex justify-between items-center">
						<Image
							src={currentworkingcompany}
							height={100}
							width={80}
							alt='com,pany logo'
							className="object-cover"
						/>
						<a href={linkedinurl} target='_blank' className='block'>
							<Image
								src={'/assets/companylogo/linkedin.svg'}
								width={25}
								height={25}
								alt='linkedIn'
							/>
						</a>
					</div>
				</div>
			</div>
		</>
	)
}

const MeetYourMentors = () => {

	return (
		<section className='content-border' id='mentor'>
			<div className="content">
				<div className="flex flex-col gap-3 items-center ">
					<Chip>mentors</Chip>
					<BoxReveal duration={0.5} boxColor='#f5f5f5'>
						<h1 className='heading'>Meet your Mentors</h1>
					</BoxReveal>
					<BoxReveal duration={0.5} boxColor='#f5f5f5'>
						<p className='desc max-w-2xl text-center'>Our alumni, who are now working at companies bigger brands and are extremely important to us and we are grateful for the opportunity to have placed them on such impressive teams around the country.</p>
					</BoxReveal>
				</div>
				<div className="w-full mt-8">
					<Swiper
						autoplay={true}
						slidesPerView={3}
						spaceBetween={20}
						modules={[Pagination, EffectFade, Autoplay]}
						loop={true}
						className='myswiper'
						breakpoints={{
							'@0.00': {
								slidesPerView: 1,
							},
							'@0.75': {
								slidesPerView: 2,
							},
							'@1.00': {
								slidesPerView: 3,
							},
							'@1.50': {
								slidesPerView: 3,
							},
						}}
					>

						{
							InstructorData.map((data) => (
								<SwiperSlide key={data.id}>

									<MentorCard {...data} />
								</SwiperSlide>
							))
						}
						<SlideNextButton />
					</Swiper>
				</div>
			</div>
		</section>
	)
}

export default MeetYourMentors