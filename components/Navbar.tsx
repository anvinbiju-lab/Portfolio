"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Github, Linkedin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const NAV_LINKS = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Achievements", href: "#achievements" },
    { name: "Contact", href: "#contact" },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState("")

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)

            // Section highlight logic
            const sections = NAV_LINKS.map(link => link.name.toLowerCase())
            for (const section of sections.reverse()) {
                const element = document.getElementById(section)
                if (element) {
                    const rect = element.getBoundingClientRect()
                    if (rect.top <= 150) {
                        setActiveSection(section)
                        break
                    }
                }
            }
            if (window.scrollY < 100) setActiveSection("")
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? "bg-[#0F172A]/80 backdrop-blur-md border-b border-cyan-900/30 py-3"
                    : "bg-transparent py-5"
                    }`}
            >
                <div className="max-w-6xl mx-auto px-6 lg:px-8 flex items-center justify-between">
                    <Link
                        href="#hero"
                        className={`relative group flex items-center gap-2 transition-all duration-300 ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
                    >
                        <div className="relative w-10 h-10 rounded-full overflow-hidden shadow-cyan-glow border border-white/20 group-hover:border-cyan/50 transition-all">
                            <Image
                                src="/anvin-biju-cybersecurity-engineer.png"
                                alt="Anvin Biju - Cybersecurity Engineer and Software Developer"
                                width={40}
                                height={40}
                                priority={true}
                                className="object-cover object-center transition-transform duration-500 group-hover:scale-110 w-full h-full"
                            />
                        </div>
                    </Link>

                    {/* Desktop Nav & Socials */}
                    <div className="hidden md:flex items-center gap-8">
                        <nav className="flex items-center gap-8 font-mono text-sm">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`relative px-1 py-2 transition-colors ${activeSection === link.name.toLowerCase()
                                        ? "text-cyan-light font-medium"
                                        : "text-text-secondary hover:text-white"
                                        }`}
                                >
                                    <span className="text-cyan-light/50 mr-1 opacity-0 group-hover:opacity-100 transition-opacity">/</span>
                                    {link.name}
                                    {activeSection === link.name.toLowerCase() && (
                                        <motion.div
                                            layoutId="navbar-indicator"
                                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan shadow-cyan-glow"
                                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            ))}
                        </nav>

                        <div className="flex items-center gap-4 text-text-secondary border-l border-cyan-900/30 pl-8">
                            <a href="https://github.com/anvinbiju-lab" target="_blank" rel="noopener noreferrer" className="hover:text-glow-cyan hover:text-white transition-all transform hover:scale-110" aria-label="GitHub">
                                <Github size={20} />
                            </a>
                            <a href="https://www.linkedin.com/in/anvin-biju" target="_blank" rel="noopener noreferrer" className="hover:text-glow-cyan hover:text-white transition-all transform hover:scale-110" aria-label="LinkedIn">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        title="Menu"
                        className="md:hidden text-text-secondary hover:text-white transition-colors"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <Menu size={28} />
                    </button>
                </div>
            </header>

            {/* Mobile Nav Drawer */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm md:hidden"
                            onClick={() => setMobileMenuOpen(false)}
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "tween", duration: 0.3 }}
                            className="fixed top-0 right-0 bottom-0 w-[280px] z-50 bg-card-bg border-l border-card-border shadow-[-10px_0_30px_rgba(0,0,0,0.5)] flex flex-col pt-20 px-8"
                        >
                            <button
                                title="close"
                                className="absolute top-5 right-6 text-text-secondary hover:text-white"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <X size={28} />
                            </button>

                            <div className="flex flex-col gap-6 mt-4 font-mono text-lg">
                                {NAV_LINKS.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`pb-2 border-b border-card-border/50 transition-colors ${activeSection === link.name.toLowerCase()
                                            ? "text-cyan-light border-cyan"
                                            : "text-text-secondary"
                                            }`}
                                    >
                                        <span className="text-cyan-light/50 mr-2">›</span>
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
