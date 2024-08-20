import { useState, useEffect } from 'react'

const WORKSHOP_DATE = new Date('2024-08-24T12:00:00') // Assuming the next occurrence is in 2024

export default function Timer() {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

    function calculateTimeLeft() {
        const difference = +WORKSHOP_DATE - +new Date()
        return difference > 0 ? difference : 0
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)

    const formatTime = (time: number) => time.toString().padStart(2, '0')

    return (
        <div className="rounded-2xl bg-black p-8 shadow-2xl backdrop-blur-sm w-fit">
            <h2 className="mb-6 text-center text-2xl font-bold text-white">
                Countdown to Workshop
            </h2>
            {timeLeft > 0 ? (
                <div className="flex flex-wrap items-center justify-center gap-6 text-white">
                    <TimeUnit label="Days" value={formatTime(days)} />
                    <TimeUnit label="Hours" value={formatTime(hours)} />
                    <TimeUnit label="Minutes" value={formatTime(minutes)} />
                    <TimeUnit label="Seconds" value={formatTime(seconds)} isSeconds={true} />
                </div>
            ) : (
                <div className="text-center text-2xl font-bold text-cyan-400">
                    The workshop has started!
                </div>
            )}
            <div className="mt-6 text-center text-gray-400">
                Workshop starts on August 24th at 12:00 PM
            </div>
        </div>
    )
}

function TimeUnit({ label, value, isSeconds = false }: any) {
    return (
        <div className="text-center">
            <div
                className={`text-5xl font-bold ${isSeconds
                    ? 'animate-pulse text-cyan-400 shadow-cyan-500/50'
                    : 'text-purple-400 shadow-purple-500/50'
                    } text-shadow`}
            >
                {value}
            </div>
            <div className="mt-2 text-sm text-gray-400">{label}</div>
        </div>
    )
}