import Link from 'next/link'
import {
	CareerPath,
	Faqs,
	Hero,
	MeetYourMentors,
	Overview,
	Projects,
	StillConfused,
	SturcturalComponent,
	WhatsIncluded,
	WhyNova
} from './components/homepage'
import HiringPartners from './components/homepage/HiringPartners'
import Tools from './components/homepage/Tools'

export default function Component() {
	return (
		<section className="">
			<Hero />
			<Overview />
			{/* <Projects /> */}
			<Tools />
			<SturcturalComponent />
			<MeetYourMentors />
			<WhyNova />
			<CareerPath />
			<WhatsIncluded />
			<HiringPartners />
			<Faqs />
			<StillConfused />
		</section>
	)
}