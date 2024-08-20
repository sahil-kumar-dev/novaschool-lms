'use client'

import OrbitingCircles from "@/components/magicui/orbiting-circles";
import Image from "next/image";
import { useWindowSize } from "@uidotdev/usehooks";

export function OrbitingIcons() {

    const size = useWindowSize();

    return (
        <div className="relative h-[450px] flex w-full mx-auto md:w-1/2 flex-col items-center justify-center ">
            <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text text-center text-5xl md:text-6xl lg:text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-black">
                &lt;Code/&gt;
            </span>

            {/* Inner Circles */}
            <OrbitingCircles
                className="size-[20px] border-none bg-transparent"
                duration={20}
                delay={18}
                radius={20}
                reverse
            >
                <Image
                    src={'/assets/techstacks/vscode.svg'}
                    height={100}
                    width={100}
                    alt=""
                />
            </OrbitingCircles>
            <OrbitingCircles
                className="size-[30px] border-none bg-transparent"
                duration={20}
                delay={18}
                radius={size?.width && size.width < 768 ? 60 : 80}
            >
                <Image
                    src={'/assets/techstacks/html.svg'}
                    height={100}
                    width={100}
                    alt=""
                />
            </OrbitingCircles>
            <OrbitingCircles
                className="size-[30px] border-none bg-transparent"
                duration={20}
                delay={12}
                radius={size?.width && size.width < 768 ? 60 : 80}
            >
                <Image
                    src={'/assets/techstacks/css.svg'}
                    height={100}
                    width={100}
                    alt=""
                />
            </OrbitingCircles>
            <OrbitingCircles
                className="size-[30px] border-none bg-transparent"
                duration={20}
                delay={6}
                radius={size?.width && size.width < 768 ? 60 : 80}
            >
                <Image
                    src={'/assets/techstacks/javascript.svg'}
                    height={100}
                    width={100}
                    alt=""
                />
            </OrbitingCircles>

            {/* Outer Circles (reverse) *************************************************************** */}


            <OrbitingCircles
                className="size-[40px] md:size-[50px] border-none bg-transparent"
                radius={size?.width && size.width < 768 ? 140 : 190}
                duration={30}
                delay={0}
                reverse
            >
                <Image
                    src={'/assets/techstacks/react.svg'}
                    height={100}
                    width={100}
                    alt=""
                />
            </OrbitingCircles>
            <OrbitingCircles
                className="size-[40px] md:size-[50px] border-none bg-transparent"
                radius={size?.width && size.width < 768 ? 140 : 190}
                duration={30}
                delay={5}
                reverse
            >
                <Image
                    src={'/assets/techstacks/typescript.svg'}
                    height={100}
                    width={100}
                    alt=""
                />
            </OrbitingCircles>
            <OrbitingCircles
                className="size-[40px] md:size-[50px]  border-none bg-transparent"
                radius={size?.width && size.width < 768 ? 140 : 190}
                duration={30}
                delay={10}
                reverse
            >
                <Image
                    src={'/assets/techstacks/node.svg'}
                    height={100}
                    width={100}
                    alt=""
                />
            </OrbitingCircles>
            <OrbitingCircles
                className="size-[40px] md:size-[50px]  border-none bg-transparent"
                radius={size?.width && size.width < 768 ? 140 : 190}
                duration={30}
                delay={15}
                reverse
            >
                <Image
                    src={'/assets/techstacks/mongo.svg'}
                    height={100}
                    width={100}
                    alt=""
                />
            </OrbitingCircles>
            <OrbitingCircles
                className="size-[40px] md:size-[50px]  border-none bg-transparent"
                radius={size?.width && size.width < 768 ? 140 : 190}
                duration={30}
                delay={20}
                reverse
            >
                <Image
                    src={'/assets/techstacks/mysql.svg'}
                    height={100}
                    width={100}
                    alt=""
                />
            </OrbitingCircles>
            <OrbitingCircles
                className="size-[40px] md:size-[50px]  border-none bg-transparent"
                radius={size?.width && size.width < 768 ? 140 : 190}
                duration={30}
                delay={25}
                reverse
            >
                <Image
                    src={'/assets/techstacks/github.svg'}
                    height={100}
                    width={100}
                    alt=""
                />
            </OrbitingCircles>
        </div>
    );
}