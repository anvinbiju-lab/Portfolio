"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { TypeAnimation } from "react-type-animation"
import { Download, ArrowRight, Github, Mail, Linkedin } from "lucide-react"
import Image from "next/image"

const TOTAL_FRAMES = 105

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [frameImages, setFrameImages] = useState<HTMLImageElement[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isMobile, setIsMobile] = useState(false)

    // Scroll tracking
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    // Map scroll progress to frame index
    const frameIndex = useTransform(scrollYProgress, [0, 1], [1, TOTAL_FRAMES])

    // Detect mobile
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    // Preload images
    useEffect(() => {
        const preloadImages = async () => {
            const loadedImages: HTMLImageElement[] = []
            let loadedCount = 0

            const handleFrameLoad = () => {
                loadedCount++
                // Dismiss loading screen early (after 10 frames) to improve perceived performance
                if (loadedCount === Math.min(10, TOTAL_FRAMES)) {
                    setIsLoading(false)
                }
                // Fallback in case TOTAL_FRAMES is less than 10
                if (loadedCount === TOTAL_FRAMES) {
                    setIsLoading(false)
                }
            }

            for (let i = 1; i <= TOTAL_FRAMES; i++) {
                const img = new window.Image()
                img.src = `/sequence/frame_${i.toString().padStart(3, '0')}.webp`
                img.onload = handleFrameLoad
                img.onerror = handleFrameLoad // Fail-safe: ensure loading screen clears even if an image fails
                loadedImages.push(img)
            }
            setFrameImages(loadedImages)
        }

        preloadImages()
    }, [])

    // Render logic - using requestAnimationFrame for smoothness
    useEffect(() => {
        if (frameImages.length === 0 || !canvasRef.current) return

        const canvas = canvasRef.current
        const context = canvas.getContext("2d")
        if (!context) return

        let animationFrameId: number

        const render = () => {
            const index = Math.floor(frameIndex.get())
            const image = frameImages[index - 1] || frameImages[0]

            if (image) {
                // Handle responsive canvas sizing
                const { innerWidth, innerHeight } = window
                canvas.width = innerWidth
                canvas.height = innerHeight

                // Draw image with "object-fit: cover" logic
                const imgAspect = image.width / image.height
                const canvasAspect = canvas.width / canvas.height

                let drawWidth, drawHeight, offsetX, offsetY

                if (imgAspect > canvasAspect) {
                    drawHeight = canvas.height
                    drawWidth = canvas.height * imgAspect
                    offsetX = (canvas.width - drawWidth) / 2
                    offsetY = 0
                } else {
                    drawWidth = canvas.width
                    drawHeight = canvas.width / imgAspect
                    offsetX = 0
                    offsetY = (canvas.height - drawHeight) / 2
                }

                context.clearRect(0, 0, canvas.width, canvas.height)
                context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight)
            }

            animationFrameId = requestAnimationFrame(render)
        }

        render()
        return () => cancelAnimationFrame(animationFrameId)
    }, [frameImages, frameIndex])

    // Text Overlay Phases Animations
    const nameOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0])
    const nameScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.9])

    const phase2Opacity = useTransform(scrollYProgress, [0.3, 0.4, 0.55, 0.65], [0, 1, 1, 0])
    const phase2X = useTransform(scrollYProgress, [0.3, 0.4], [40, 0])

    const phase3Opacity = useTransform(scrollYProgress, [0.7, 0.85], [0, 1])
    const phase3Y = useTransform(scrollYProgress, [0.7, 0.85], [30, 0])

    return (
        <section ref={containerRef} id="hero" className="relative h-[300vh] bg-black">
            {/* Loading Screen */}
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center"
                    >
                        <div className="w-12 h-12 border-4 border-cyan/20 border-t-cyan rounded-full animate-spin mb-4" />
                        <p className="text-cyan-light font-mono text-xs tracking-widest uppercase">Initializing Cinematic Experience...</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Sticky Canvas / Fallback */}
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center">
                <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-60" />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-[1]" />

                {/* Content Layers */}
                <div className="relative z-[10] w-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center justify-center text-center">

                    {/* Phase 1: The Intro (0-25%) */}
                    <motion.div
                        style={{ opacity: nameOpacity, scale: nameScale }}
                        className="flex flex-col items-center"
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter mb-4 text-glow-cyan"
                        >
                            Anvin Biju
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1 }}
                            className="text-text-secondary font-mono text-sm md:text-lg tracking-[0.2em] uppercase"
                        >
                            Cybersecurity Engineer And Software Developer
                        </motion.p>

                        <motion.div
                            className="absolute bottom-[-40vh] md:bottom-[-20vh] flex flex-col items-center animate-bounce-slow"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 }}
                        >
                            <span className="text-[10px] font-mono text-text-secondary mb-2 tracking-[0.4em] uppercase">Scroll to begin</span>
                            <div className="w-[1px] h-12 bg-gradient-to-b from-cyan to-transparent" />
                        </motion.div>
                    </motion.div>

                    {/* Phase 2: The Action (25-65%) */}
                    <motion.div
                        style={{ opacity: phase2Opacity, x: phase2X }}
                        className="absolute right-6 md:right-12 lg:right-24 text-right max-w-2xl px-6 md:px-0"
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
                            Building security tools<br />& apps that matter.
                        </h2>
                        <div className="text-xl md:text-3xl font-bold text-slate text-glow-slate h-12">
                            <TypeAnimation
                                sequence={[
                                    "Android Security Apps.",
                                    2000,
                                    "Windows Automation Tools.",
                                    2000,
                                    "Chrome Extensions.",
                                    2000,
                                    "Web Platforms.",
                                    2000,
                                ]}
                                wrapper="span"
                                speed={50}
                                repeat={Infinity}
                            />
                        </div>
                    </motion.div>

                    {/* Phase 3: The Conclusion & CTAs (65-100%) */}
                    <motion.div
                        style={{ opacity: phase3Opacity, y: phase3Y }}
                        className="flex flex-col items-center"
                    >
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-10 leading-tight">
                            Expertise in Kotlin, Python,<br /><span className="text-cyan">Next.js & Ethical Hacking.</span>
                        </h2>

                        <div className="flex flex-col md:flex-row gap-6 mb-12">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(34, 211, 238, 0.5)" }}
                                className="px-10 py-4 bg-cyan text-white font-bold rounded-lg transition-all flex items-center gap-3 overflow-hidden group relative"
                                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                <span className="relative z-10 font-bold tracking-wider">View My Work</span>
                                <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                            </motion.button>

                            <motion.a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                className="px-10 py-4 border-2 border-slate/50 hover:border-slate text-slate hover:bg-slate/5 rounded-lg font-bold transition-all flex items-center gap-3"
                            >
                                <Download size={20} />
                                <span>Download CV</span>
                            </motion.a>
                        </div>

                        {/* Social Icons */}
                        <div className="flex items-center gap-8">
                            <a href="https://github.com/anvinbiju-lab" target="_blank" className="text-text-secondary hover:text-white transition-all transform hover:scale-125">
                                <Github size={32} />
                            </a>
                            <a href="https://www.linkedin.com/in/anvin-biju" target="_blank" className="text-text-secondary hover:text-white transition-all transform hover:scale-125">
                                <Linkedin size={32} />
                            </a>
                            <a href="mailto:anvinbiju1@gmail.com" className="text-text-secondary hover:text-white transition-all transform hover:scale-125">
                                <Mail size={32} />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Navbar Scroll Interaction Helper */}
            <ScrollNavbarHelper />
        </section>
    )
}

function ScrollNavbarHelper() {
    useEffect(() => {
        const handleScroll = () => {
            const nav = document.querySelector('nav')
            if (nav) {
                if (window.scrollY > 50) {
                    nav.classList.add('navbar-scrolled')
                    nav.classList.remove('bg-transparent')
                } else {
                    nav.classList.remove('navbar-scrolled')
                    nav.classList.add('bg-transparent')
                }
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    return null
}
