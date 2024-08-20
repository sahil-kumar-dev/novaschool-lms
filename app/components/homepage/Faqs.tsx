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
// import { Accordion, AccordionItem } from "@nextui-org/react";
// import FaqData from '../../../data/FaqData';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import Chip from '../helper/Chip';
import { useState } from "react";

const Faqs = () => {

    // const [isOpen, setIsOpen] = useState(false)

    return (
        <section className='content-border' id='faq'>
            <div className="content space-y-4">
                <div className="flex items-center justify-center">
                    <Chip>faqs</Chip>
                </div>
                <h1 className='heading text-center'>Frequently asked questions</h1>

                {/* <Accordion
                    variant="splitted"
                    defaultExpandedKeys={["1"]}
                    itemClasses={{
                        base: "group rounded-2xl md:rounded-[24px] bg-[#f5f5f5] pl-4 pr-10 md:px-8 py-3 relative",
                        title: "font-bold leading-6 text-[18px] text-[#111111] [data-open]:rotate-90 text-left",
                        content: "text-[18px] font-medium text-[#747474]",
                        indicator: "absolute right-4 md:right-10"
                    }}
                    className=""
                >
                    {
                        FaqData.map(({ id, answer, question }) => (
                            <AccordionItem
                                key={id}
                                aria-label={`Accordian ${id}`}
                                title={question}
                                indicator={({ isOpen }) => isOpen ?
                                    <div className={`text-xl rotate-45 origin-center`}>
                                        <FaArrowRight />
                                    </div> :
                                    <div className={`text-xl -rotate-45 origin-center`}>
                                        <FaArrowRight />
                                    </div>
                                }
                            >
                                {answer}
                            </AccordionItem>
                        ))
                    }
                </Accordion> */}
            </div>
        </section>
    )
}

export default Faqs