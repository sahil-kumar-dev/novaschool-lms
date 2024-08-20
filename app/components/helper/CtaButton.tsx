import ShinyButton from '@/components/magicui/shiny-button';
import Link from 'next/link';
import React, { ReactNode } from 'react'

type CtaButtonProps = {
	children: string;
	path?: string
}

const CtaButton = ({ children, path }: CtaButtonProps) => {
	return (
		// <button className='px-4 py-3 bg-[#111111] hover:bg-white hover:text-black border-2 border-white hover:border-black text-[16px] leading-5 text-white font-semibold rounded-[10px] transition-all duration-200'>
		// 	{/* {children} */}
		// {/* </button> */}
		// <div className="">
		<Link href={path ? path : '/partner-with-us'}>
			<ShinyButton text={children} className='bg-[#111111] text-white ctabutton relative overflow-hidden' />
		</Link>
		// {/* </div> */}
	)
}

export default CtaButton