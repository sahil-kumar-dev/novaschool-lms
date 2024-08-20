'use client'

import { GiHamburgerMenu } from "react-icons/gi"

// import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@nextui-org/dropdown";
import { FooterLinks } from '@/data/LinksData';
import { FaArrowRight } from 'react-icons/fa6';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from "next/link";
import CtaButton from "../helper/CtaButton";
import { useGetProfileQuery } from "@/app/lib/api";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLogout } from "@/hooks/useLogout";


const Navbar = () => {

    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    const logout = useLogout()

    const { data: profile, isLoading, isError } = useGetProfileQuery()


    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            setVisible(currentScrollPos < prevScrollPos);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos, visible]);

    return (
        <nav className={`flex justify-between flex-col sticky ${visible ? 'top-0' : '-top-96'} bg-white z-50 shadow-lg transition-all duration-500`}>
            <div className="content py-3 flex items-center justify-between ">
                <Link href={'/'}>
                    <Image
                        src='/assets/footerlogo.png'
                        width={100}
                        height={100}
                        alt='logo'
                        className='invert w-16 md:w-auto'
                    />
                </Link>
                <div className="flex gap-4 items-center">
                    {
                        profile &&

                        // <Link href={'/dashboard'}>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <div className="flex gap-2 items-center">
                                    <Image
                                        src={profile?.thumbnail || ''}
                                        alt='profile'
                                        width={40}
                                        height={40}
                                        className='rounded-full'
                                    />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link href={'/profile'}>
                                        Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href={'/courses'}>
                                        My Courses
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <button onClick={logout}>
                                        Logout
                                    </button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        // {/* </Link> */}
                    }
                    {
                        !profile &&
                        <>
                            <CtaButton path='/login'>
                                Login
                            </CtaButton>
                            <CtaButton path='/signup'>
                                Sign up
                            </CtaButton>
                        </>
                    }


                    <div className="relative">
                        {/* <Dropdown className='mt-8'>
                            <DropdownTrigger>
                                <span className='cursor-pointer text-2xl'>
                                    <GiHamburgerMenu />
                                </span>
                            </DropdownTrigger>
                            <DropdownMenu
                                className='p-2 bg-white shadow-lg rounded-xl'
                            >
                                {
                                    FooterLinks.map(({ id, label, path }) => (
                                        id != 9 ?
                                            <DropdownItem
                                                as={Link}
                                                key={id}
                                                className='hover:bg-[#f3f3f3] text-[#989898] hover:text-black rounded-[13px] py-2 px-5'
                                                endContent={<FaArrowRight className='-rotate-45' />}
                                                href={path}
                                            >
                                                <p className='text-[16px] leading-6 font-bold'>{label}</p>
                                            </DropdownItem>
                                            :
                                            <DropdownItem
                                                key={'jobseeker'}
                                                className="bg-[#000] text-white font-semibold flex items-center justify-center rounded-[13px] py-2 px-5"
                                            >
                                                <Link href={path}>
                                                    <p className="">{label}</p>
                                                </Link>
                                            </DropdownItem>
                                    ))
                                }
                            </DropdownMenu>
                        </Dropdown> */}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar