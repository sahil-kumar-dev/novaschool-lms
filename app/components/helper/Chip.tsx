import React from 'react'

const Chip = ({children}:{children:string}) => {
    return (
        <div className='p-1 bg-[#dfdfdf] rounded-[4px] text-black w-fit relative overflow-hidden animate-pulse'>
            <h1 className='uppercase font-bold text-[12px] relative z-10'>{children}</h1>
        </div>
    )
}

export default Chip