import React from 'react'
import CtaButton from '../helper/CtaButton'
import Image from 'next/image'

const StillConfused = () => {
    return (
        <section className="content-border" id=''>
            <div className="content">
                <div className='p-4 md:p-10 flex justify-between relative flex-col-reverse md:flex-row bg-primary rounded-xl md:rounded-[40px] gap-4 lg:gap-0'>
                    <div className="space-y-4 md:max-w-md lg:max-w-lg">
                        <h1 className='heading'>Still Confused?</h1>
                        <p className='font-medium text-[18px] leading-6 text-[#747474] '>
                            Get Connected to our experts and know what's best for you.Achieve your dreams!
                        </p>
                        <div className="mt-4 lg:mt-0">
                            <CtaButton>
                                Partner with Us
                            </CtaButton>
                        </div>
                    </div>
                    <div className="md:absolute md:right-10 lg:right-20 bottom-0">
                        <Image
                            src={'/assets/thinking.svg'}
                            width={230}
                            height={230}
                            alt='thinking'
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default StillConfused