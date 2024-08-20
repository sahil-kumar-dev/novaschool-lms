'use client'

import { Tab, Tabs } from "@nextui-org/react";
import 'react-phone-number-input/style.css';
import CollgePartner from "../form/CollgePartner";
import TalentHiring from "../form/TalentHiring";


const ContactFrom = () => {

    return (
        <div className="content">
            <Tabs
                variant="bordered"
                color="success"
                classNames={{
                    tabList: "gap-6 w-full rounded-none p-0 mt-4 overflow-scroll md:overflow-auto ",
                    cursor: "w-full bg-[#f5f5f5] rounded-[14px]",
                    tab: "max-w-fit px-0 ",
                    tabContent: "border-[#d7d7d7] border rounded-[14px] py-3 px-2 md:px-5 font-semibold text-xs md:text-[16px] leading-5 text-nowrap",
                }}
            >
                <Tab title="College Partnership" key={'partnership'}>
                    <CollgePartner />
                </Tab>
                <Tab title="Talent Hiring Company" key={'talent'}>
                    <TalentHiring />
                </Tab>
            </Tabs>
        </div>
    )
}

export default ContactFrom