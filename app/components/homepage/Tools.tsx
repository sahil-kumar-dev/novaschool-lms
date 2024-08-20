import Image from 'next/image'
import React from 'react'
import Chip from '../helper/Chip'

export const techStacks = [
    { id: 1, name: 'VS Code', logo: '/assets/techstacks/vscode.svg' },
    { id: 2, name: 'HTML', logo: '/assets/techstacks/html.svg' },
    { id: 3, name: 'CSS', logo: '/assets/techstacks/css.svg' },
    { id: 4, name: 'Javascript', logo: '/assets/techstacks/javascript.svg' },
    { id: 5, name: 'Git', logo: '/assets/techstacks/git.svg' },
    { id: 6, name: 'GitHub', logo: '/assets/techstacks/github.svg' },
    { id: 7, name: 'TailwindCSS', logo: '/assets/techstacks/tailwindcss.svg' },
    { id: 8, name: 'React', logo: '/assets/techstacks/react.svg' },
    { id: 9, name: 'NodeJS', logo: '/assets/techstacks/node.svg' },
    { id: 10, name: 'MongoDB', logo: '/assets/techstacks/mongo.svg' },
    { id: 11, name: 'ExpressJS', logo: '/assets/techstacks/expressjs.svg' },
    { id: 12, name: 'Postman', logo: '/assets/techstacks/postman.svg' },
]

const Tools = () => {
    return (
        <div className='content-border'>
            <div className="content">
            <div className="flex items-center justify-center gap-2 flex-col">
                    <Chip>
                        tools and softwares
                    </Chip>
                    <h1 data-aos="fade-up" className="heading text-center">Unlock Your Success with <br /> Cutting-Edge Tools</h1>
                </div>
                <div className="md:flex grid grid-cols-3 flex-wrap justify-center gap-4 md:gap-10 items-center mt-10">
                    {techStacks.map((tech) => (
                        <div key={tech.id} data-aos="zoom-in" className="bg-primary rounded-lg md:rounded-2xl p-3 md:p-6 flex items-center flex-col gap-2 md:gap-4 w-full md:w-48 ">
                            <Image
                                src={tech.logo}
                                alt={tech.name}
                                width={50}
                                height={50}
                                className='size-10 md:size-14 object-contain aspect-square'
                            />
                            <h1 className='text-black font-bold text-xs md:text-xl'>{tech.name}</h1>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Tools