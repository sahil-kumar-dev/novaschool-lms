'use client'

// import {
//     Accordion,
//     AccordionItem,
//     AccordionItemButton,
//     AccordionItemHeading,
//     AccordionItemPanel,
//     AccordionItemState,
// } from 'react-accessible-accordion';
// import 'react-accessible-accordion/dist/fancy-example.css';
import { FaArrowRight } from "react-icons/fa6";
import StructuralCurriculumData from '../../../data/StructuralCurriculumData';

const SturcturalComponent = () => {

    return (
        // <section className='content-border' id='curriculum'>
        //     <div className="content">
        //         <div className="">
        //             <h1 className='font-bold text-[28px] md:text-[40px] leading-[48px] tracking-tight'>Structural Curriculum</h1>
        //         </div>

        //         <Accordion preExpanded={[1]} className='border-none space-y-4 mt-5' >
        //             {
        //                 StructuralCurriculumData.map(({ id, title, points, category }) => (
        //                     <AccordionItem className='border-none' key={id} uuid={id} data-aos="fade-up" data-aos-delay={id * 10}>
        //                         <div className="border border-black/40 rounded-[20px] bg-[#f5f5f5] p-5 md:p-[24px_32px_24px_32px]">
        //                             <AccordionItemHeading>
        //                                 <AccordionItemButton className=''>

        //                                     {/* Title of the accordian */}
        //                                     <div className="flex justify-between items-center md:items-start">
        //                                         <div className="flex items-start md:items-center gap-1 md:gap-4 flex-col-reverse md:flex-row">
        //                                             <h1 className='text-[#111111] text-[22px] font-semibold md:font-bold capitalize'>{title}</h1>
        //                                             <div className='p-1 bg-[#747474] rounded-[4px] text-white'>
        //                                                 <h1 className='uppercase font-bold text-[10px]'>{category}</h1>
        //                                             </div>
        //                                         </div>

        //                                         {/* Logic to change state of the arrow on the change of accordian state */}
        //                                         <AccordionItemState>
        //                                             {({ expanded }) => (expanded ?
        //                                                 <div className={`text-xl rotate-45`}>
        //                                                     <FaArrowRight />
        //                                                 </div>
        //                                                 :
        //                                                 <div className={`text-xl -rotate-45`}>
        //                                                     <FaArrowRight />
        //                                                 </div>
        //                                             )}
        //                                         </AccordionItemState>

        //                                     </div>
        //                                 </AccordionItemButton>
        //                             </AccordionItemHeading>

        //                             {/* List items of all the topics */}
        //                             <AccordionItemPanel className=''>
        //                                 <div className="p-6 pb-0 border-dashed border-t border-black/40 mt-4">
        //                                     <ul className=' md:list-inside list-disc font-medium text-[16px] md:text-[18px] text-[#747474] flex flex-col gap-1 md:pl-5 leading-7'>
        //                                         {
        //                                             points.map((item, idx) => (
        //                                                 <li key={idx} className=''>{item}</li>
        //                                             ))
        //                                         }
        //                                     </ul>
        //                                 </div>
        //                             </AccordionItemPanel>

        //                         </div>
        //                     </AccordionItem>
        //                 ))
        //             }
        //         </Accordion>
        //     </div>
        // </section>
        <>
        
        </>
    )
}

export default SturcturalComponent