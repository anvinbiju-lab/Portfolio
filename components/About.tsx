"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import TerminalWindow from "./TerminalWindow"
import Link from "next/link"

function useCountUp(end: number, duration: number = 2000, trigger: boolean = false) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!trigger) return

        let startTime: number | null = null
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp
            const progress = Math.min((timestamp - startTime) / duration, 1)
            // easeOutExpo
            const easing = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
            setCount(Math.floor(easing * end))
            if (progress < 1) {
                window.requestAnimationFrame(step)
            }
        }
        window.requestAnimationFrame(step)
    }, [end, duration, trigger])

    return count
}

const STATS = [
    { label: "Projects Built", value: 8, suffix: "+", href: "#projects" },
    { label: "Certifications", value: 2, suffix: "", href: "#achievements" },
    { label: "National Hackathon", value: 1, suffix: "", href: "#achievements" },
    { label: "Languages", value: 3, suffix: "+", href: "#skills" },
]

export default function About() {
    const [inView, setInView] = useState(false)

    const terminalLines = [
        { command: "whoami", output: "Anvin Biju — Developer & Security Enthusiast" },
        { command: "location", output: "Ernakulam, Kerala, India" },
        { command: "status", output: "2nd Year B.Tech CSE (Cybersecurity) @ HGAE" },
        { command: "passion", output: "Building things that solve MY own problems" },
        { command: "cat currently_learning.txt", output: "Ethical Hacking | Android Dev | Web Dev" }
    ]

    return (
        <section id="about" className="py-24 relative z-10">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <div className="section-command">
                        <span className="prompt">&gt;</span>
                        <span className="command">cat</span> about.md
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        System <span className="text-cyan">Overview</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left: Terminal Window */}
                    <div className="w-full">
                        <TerminalWindow lines={terminalLines} title="~/anvin/about" delay={800} />
                    </div>

                    {/* Right: Stats Grid */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        onViewportEnter={() => setInView(true)}
                        className="grid grid-cols-2 gap-6"
                    >
                        {STATS.map((stat, i) => (
                            <StatCard
                                key={stat.label}
                                stat={stat}
                                index={i}
                                startAnimation={inView}
                            />
                        ))}
                    </motion.div>

                </div>
            </div>
        </section>
    )
}

function StatCard({ stat, index, startAnimation }: { stat: any, index: number, startAnimation: boolean }) {
    const count = useCountUp(stat.value, 2000, startAnimation)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <Link
                href={stat.href}
                className="block bg-card-bg border border-card-border p-6 rounded-xl hover:border-cyan/50 cursor-pointer transition-colors group h-full"
            >
                <div className="text-4xl md:text-5xl font-black text-white mb-2 font-mono group-hover:text-glow-cyan transition-all">
                    {count}{stat.suffix}
                </div>
                <div className="text-sm md:text-base text-text-secondary font-medium">
                    {stat.label}
                </div>
            </Link>
        </motion.div>
    )
}
