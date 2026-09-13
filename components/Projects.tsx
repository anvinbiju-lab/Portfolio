"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Shield, MousePointerClick, Users, Github,
    ChevronLeft, ChevronRight, X, ExternalLink,
    Bot, ShieldCheck, Lock, Wifi, Smartphone,
    Globe, Monitor, Chrome, Zap, Star, ArrowUpRight
} from "lucide-react"
import Image from "next/image"

// ─── Types ───────────────────────────────────────────────────────────────────
type Platform = "android" | "web" | "windows" | "chrome"
type Status = "active" | "live" | "complete"

interface Project {
    id: string
    title: string
    subtitle: string
    icon: React.ReactNode
    iconBg: string
    date: string
    description: string
    features: string[]
    tags: string[]
    github: string
    link?: string
    theme: "cyan" | "slate"
    platform: Platform
    status: Status
    images?: string[]
    gradient: string
}

// ─── Platform Config ─────────────────────────────────────────────────────────
const PLATFORM_CONFIG: Record<Platform, { label: string; icon: React.ReactNode; color: string; bg: string }> = {
    android: {
        label: "Android",
        icon: <Smartphone size={11} />,
        color: "text-emerald-400",
        bg: "bg-emerald-400/10 border-emerald-400/30",
    },
    web: {
        label: "Web App",
        icon: <Globe size={11} />,
        color: "text-blue-400",
        bg: "bg-blue-400/10 border-blue-400/30",
    },
    windows: {
        label: "Windows",
        icon: <Monitor size={11} />,
        color: "text-violet-400",
        bg: "bg-violet-400/10 border-violet-400/30",
    },
    chrome: {
        label: "Extension",
        icon: <Chrome size={11} />,
        color: "text-amber-400",
        bg: "bg-amber-400/10 border-amber-400/30",
    },
}

const STATUS_CONFIG: Record<Status, { label: string; color: string; dot: string }> = {
    active: { label: "In Dev", color: "text-amber-400", dot: "bg-amber-400" },
    live: { label: "Live", color: "text-emerald-400", dot: "bg-emerald-400" },
    complete: { label: "Complete", color: "text-cyan", dot: "bg-cyan" },
}

// ─── Projects Data ────────────────────────────────────────────────────────────
const PROJECTS: Project[] = [
    {
        id: "scanmatrix",
        title: "ScanMatrix",
        subtitle: "Android Security Scanner",
        icon: <Shield size={22} className="text-cyan" />,
        iconBg: "bg-cyan/10 border-cyan/30",
        date: "2025 – Present",
        description:
            "Comprehensive Android security app that scans installed apps, permissions, and network activity. Features real-time threat detection and VirusTotal API integration for on-demand APK/file reputation checks.",
        features: [
            "On-device heuristic scan engine for real-time threat detection",
            "VirusTotal API integration for APK & file reputation checks",
            "DNS monitoring and per-app permission management with revoke controls",
            "WorkManager-powered scheduled threat-definition updates",
            "Room DB persistence for scan history and threat logs",
        ],
        tags: ["Kotlin", "Jetpack Compose", "Room DB", "VirusTotal API", "Android 14"],
        github: "https://github.com/anvinbiju1-lab/ScanMatrix",
        theme: "cyan",
        platform: "android",
        status: "active",
        gradient: "from-cyan/20 via-cyan/5 to-transparent",
    },
    {
        id: "jarvis-lite",
        title: "Jarvis Lite",
        subtitle: "Android Voice Assistant",
        icon: <Bot size={22} className="text-violet-400" />,
        iconBg: "bg-violet-400/10 border-violet-400/30",
        date: "May 2026 – Present",
        description:
            "A voice-first Android assistant that controls on-screen phone actions using Accessibility Service, speech recognition, and safe Android system APIs — no root required.",
        features: [
            "Accessibility-based action engine: node search by text/content description",
            "Indexed clickable item selection & safe text entry into editable fields",
            "Voice command parsing with execution result logging and fallback error handling",
            "Reusable app adapters for YouTube, Instagram — automating in-app actions via voice",
            "Operates entirely within Android platform limits, no root required",
        ],
        tags: ["Kotlin", "Jetpack Compose", "Accessibility Service", "Speech-to-Text APIs"],
        github: "https://github.com/anvinbiju1-lab/Jarvis-Lite",
        theme: "slate",
        platform: "android",
        status: "active",
        gradient: "from-violet-500/20 via-violet-500/5 to-transparent",
    },
    {
        id: "wistream",
        title: "WiStream",
        subtitle: "Wi-Fi FTP Media Server",
        icon: <Wifi size={22} className="text-cyan" />,
        iconBg: "bg-cyan/10 border-cyan/30",
        date: "Mar 2026",
        description:
            "Turns your Android phone into an always-on Wi-Fi FTP media server for local streaming to Android TV via VLC. Optimized for smooth playback of large 3–4 GB movie files over Wi-Fi.",
        features: [
            "Native Android FTP server that runs as a foreground service",
            "Screen-off operation — keeps serving even when the display is off",
            "Folder picker for selectively sharing specific directories",
            "Optimized buffer settings for smooth 3–4 GB file streaming via VLC",
            "Persistent notification with server IP:port for easy client connection",
        ],
        tags: ["Kotlin", "Android", "FTP Server", "Foreground Service", "VLC Streaming"],
        github: "https://github.com/anvinbiju1-lab/WiStream",
        theme: "cyan",
        platform: "android",
        status: "complete",
        gradient: "from-cyan/20 via-sky-500/5 to-transparent",
    },
    {
        id: "cyberscan",
        title: "CyberScan",
        subtitle: "Web Security & HTTP Header Auditor",
        icon: <ShieldCheck size={22} className="text-cyan" />,
        iconBg: "bg-cyan/10 border-cyan/30",
        date: "Jul 2026",
        description:
            "A web security auditing utility that analyzes HTTP response headers and security configurations of target websites in real-time, scoring them and providing actionable remediation tips.",
        features: [
            "Automated inspection of CSP, HSTS, X-Frame-Options, X-Content-Type-Options headers",
            "Rule-based scoring module that grades web server configurations",
            "Flags version/server banner disclosures as security risks",
            "Animated score counters and dynamic state transitions in the UI",
            "Scan history tracking for repeated audits",
        ],
        tags: ["Python", "FastAPI", "Tailwind CSS", "Web Security"],
        github: "https://github.com/anvinbiju1-lab/CyberScan",
        link: "https://anvin-cyber-scan.vercel.app",
        theme: "cyan",
        platform: "web",
        status: "live",
        gradient: "from-cyan/20 via-blue-500/5 to-transparent",
    },
    {
        id: "keyguard",
        title: "KeyGuard",
        subtitle: "Password & Breach Auditor",
        icon: <Lock size={22} className="text-slate-light" />,
        iconBg: "bg-slate/10 border-slate/30",
        date: "Jul 2026",
        description:
            "A privacy-first web app that evaluates password mathematical strength and checks against known data breach repositories using zero-knowledge k-Anonymity principles.",
        features: [
            "HaveIBeenPwned API integration via k-Anonymity — plain-text passwords never leave the device",
            "Information entropy calculation using character set distribution and bit-entropy scoring",
            "Real-time strength meter with character pool badges",
            "Enterprise-grade minimalist interface with actionable remediation feedback",
            "Zero telemetry — privacy-first by design",
        ],
        tags: ["Python", "HaveIBeenPwned API", "Bit-Entropy", "Information Security"],
        github: "https://github.com/anvinbiju1-lab/KeyGuard",
        link: "https://anvin-key-guard.vercel.app",
        theme: "slate",
        platform: "web",
        status: "live",
        gradient: "from-slate/20 via-slate/5 to-transparent",
    },
    {
        id: "clickforge",
        title: "ClickForge",
        subtitle: "Windows Mouse Shortcut Utility",
        icon: <MousePointerClick size={22} className="text-violet-400" />,
        iconBg: "bg-violet-400/10 border-violet-400/30",
        date: "2026",
        description:
            "Lightweight Windows desktop utility for custom mouse shortcuts using global low-level hooks. Features hold-click actions for screenshots, app launches, and volume control. Runs at <0.5% CPU idle.",
        features: [
            "Global low-level mouse hooks that work across all applications",
            "Hold-click actions: screenshots, app launches, volume control",
            "Animated system tray UI with live shortcut status",
            "Single-file .exe packaging via PyInstaller — no installation required",
            "Under 0.5% CPU usage at idle — genuinely lightweight",
        ],
        tags: ["Python", "CustomTkinter", "pynput", "pystray", "PyInstaller"],
        github: "https://github.com/anvinbiju1-lab/ClickForge",
        theme: "slate",
        platform: "windows",
        status: "complete",
        gradient: "from-violet-500/20 via-violet-500/5 to-transparent",
        images: ["/clickforge.png", "/clickforge-settings.png", "/clickforge-log.png", "/clickforge-edit.png"],
    },
    {
        id: "instagram",
        title: "IG Non-Followers",
        subtitle: "Instagram Follower Analyzer",
        icon: <Users size={22} className="text-amber-400" />,
        iconBg: "bg-amber-400/10 border-amber-400/30",
        date: "2026",
        description:
            "Chrome Extension (MV3) that scans your Instagram followers/following lists to identify accounts that don't follow you back. Features throttled profile checks to avoid rate limits and CSV export.",
        features: [
            "DOM parsing engine to extract followers and following lists in-browser",
            "Throttled profile checks to stay under Instagram's rate limits",
            "CSV export of non-followers for easy review",
            "Persistent settings and results via chrome.storage API",
            "Manifest V3 compliant — future-proof Chrome extension architecture",
        ],
        tags: ["JavaScript", "Chrome MV3", "DOM Parsing", "CSV Export"],
        github: "https://github.com/anvinbiju1-lab/IG-Non-Followers",
        theme: "cyan",
        platform: "chrome",
        status: "complete",
        gradient: "from-amber-500/20 via-amber-500/5 to-transparent",
    },
]

// ─── Category grouping ────────────────────────────────────────────────────────
const CATEGORIES = [
    {
        id: "android",
        label: "Android Apps",
        icon: <Smartphone size={16} />,
        color: "text-emerald-400",
        borderColor: "border-emerald-400/40",
        platforms: ["android"] as Platform[],
    },
    {
        id: "web",
        label: "Web Apps",
        icon: <Globe size={16} />,
        color: "text-blue-400",
        borderColor: "border-blue-400/40",
        platforms: ["web"] as Platform[],
    },
    {
        id: "tools",
        label: "Desktop & Browser Tools",
        icon: <Monitor size={16} />,
        color: "text-violet-400",
        borderColor: "border-violet-400/40",
        platforms: ["windows", "chrome"] as Platform[],
    },
]

// ─── Image Carousel ───────────────────────────────────────────────────────────
function ImageCarousel({ images, isModal = false }: { images: string[]; isModal?: boolean }) {
    const [currentIndex, setCurrentIndex] = useState(0)

    const next = (e: React.MouseEvent) => {
        e.stopPropagation(); e.preventDefault()
        setCurrentIndex((p) => (p + 1) % images.length)
    }
    const prev = (e: React.MouseEvent) => {
        e.stopPropagation(); e.preventDefault()
        setCurrentIndex((p) => (p - 1 + images.length) % images.length)
    }

    if (!images?.length) return null

    return (
        <div className={`relative w-full ${isModal ? "aspect-video" : "aspect-video"} rounded-xl overflow-hidden mb-6 border border-[#334155] group/carousel`}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                >
                    <Image
                        src={images[currentIndex]}
                        alt={`Screenshot ${currentIndex + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                    />
                </motion.div>
            </AnimatePresence>

            {images.length > 1 && (
                <>
                    <button onClick={prev} aria-label="Previous"
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity backdrop-blur-sm border border-white/10">
                        <ChevronLeft size={16} />
                    </button>
                    <button onClick={next} aria-label="Next"
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity backdrop-blur-sm border border-white/10">
                        <ChevronRight size={16} />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-0 group-hover/carousel:opacity-100 transition-opacity">
                        {images.map((_, i) => (
                            <button key={i} onClick={(e) => { e.stopPropagation(); setCurrentIndex(i) }}
                                className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentIndex ? "bg-white scale-125" : "bg-white/40"}`} />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

// ─── Gradient Banner (for projects without screenshots) ───────────────────────
function AppBanner({ project }: { project: Project }) {
    const platformCfg = PLATFORM_CONFIG[project.platform]
    return (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6 border border-[#334155] flex items-center justify-center">
            {/* Gradient BG */}
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
            <div className="absolute inset-0 grid-pattern opacity-20" />

            {/* Centered icon + name */}
            <div className="relative z-10 flex flex-col items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border ${project.iconBg} backdrop-blur-sm`}>
                    {project.icon && <span className="scale-150">{project.icon}</span>}
                </div>
                <div className="text-center">
                    <p className="text-white font-bold text-lg tracking-tight">{project.title}</p>
                    <p className={`text-xs font-mono mt-1 flex items-center gap-1.5 justify-center ${platformCfg.color}`}>
                        {platformCfg.icon}
                        {platformCfg.label}
                    </p>
                </div>
            </div>
        </div>
    )
}

// ─── Project Modal ────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
    const platformCfg = PLATFORM_CONFIG[project.platform]
    const statusCfg = STATUS_CONFIG[project.status]

    useEffect(() => {
        document.body.style.overflow = "hidden"
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
        window.addEventListener("keydown", handler)
        return () => {
            document.body.style.overflow = "unset"
            window.removeEventListener("keydown", handler)
        }
    }, [onClose])

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] p-4 sm:p-6 md:p-10 flex items-center justify-center"
            >
                {/* Backdrop */}
                <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />

                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="relative w-full max-w-5xl max-h-[90vh] bg-[#0F1928] border border-[#1E3A5F] rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10"
                    onClick={(e) => e.stopPropagation()}
                    style={{ boxShadow: "0 0 60px rgba(34, 211, 238, 0.08), 0 25px 50px rgba(0,0,0,0.5)" }}
                >
                    {/* Modal Header */}
                    <div className="flex-none p-5 md:p-6 border-b border-[#1E3A5F] flex items-center justify-between">
                        <div className="flex items-center gap-4 min-w-0">
                            <div className={`w-11 h-11 rounded-xl flex items-center justify-center border shrink-0 ${project.iconBg}`}>
                                {project.icon}
                            </div>
                            <div className="min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h2 className="text-lg md:text-xl font-bold text-white tracking-tight truncate">{project.title}</h2>
                                    {/* Platform badge */}
                                    <span className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full border ${platformCfg.bg} ${platformCfg.color}`}>
                                        {platformCfg.icon}{platformCfg.label}
                                    </span>
                                    {/* Status badge */}
                                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono ${statusCfg.color}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot} animate-pulse`} />
                                        {statusCfg.label}
                                    </span>
                                </div>
                                <p className="text-xs font-mono text-cyan/70 mt-0.5">{project.date}</p>
                            </div>
                        </div>
                        <button onClick={onClose}
                            className="p-2 rounded-full hover:bg-white/10 text-text-secondary hover:text-white transition-colors shrink-0 ml-4"
                            title="Close (Esc)">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Modal Body */}
                    <div className="flex-1 overflow-y-auto p-5 md:p-8 space-y-8"
                        style={{ scrollbarWidth: "thin", scrollbarColor: "#22D3EE #1E293B" }}>

                        {/* Screenshot carousel or banner */}
                        {project.images ? (
                            <ImageCarousel images={project.images} isModal />
                        ) : (
                            <AppBanner project={project} />
                        )}

                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                            {/* Left: Description + Features */}
                            <div className="lg:col-span-3 space-y-6">
                                <div>
                                    <h3 className="text-[11px] font-mono text-cyan/60 tracking-[0.2em] uppercase mb-3">&gt; Overview</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm md:text-base">{project.description}</p>
                                </div>

                                <div className="border-t border-[#1E3A5F] pt-6">
                                    <h3 className="text-[11px] font-mono text-cyan/60 tracking-[0.2em] uppercase mb-4">&gt; Key Features</h3>
                                    <ul className="space-y-3">
                                        {project.features.map((f, i) => (
                                            <motion.li
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                className="flex items-start gap-3 text-sm text-text-secondary"
                                            >
                                                <span className="mt-1 w-4 h-4 rounded bg-cyan/10 border border-cyan/30 flex items-center justify-center shrink-0">
                                                    <Zap size={9} className="text-cyan" />
                                                </span>
                                                <span className="leading-relaxed">{f}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Right: Tech Stack + Links */}
                            <div className="lg:col-span-2 space-y-6">
                                <div>
                                    <h3 className="text-[11px] font-mono text-cyan/60 tracking-[0.2em] uppercase mb-4">&gt; Tech Stack</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <span key={tag}
                                                className="text-[11px] font-mono px-2.5 py-1.5 rounded-lg bg-[#1A2744] text-text-secondary border border-[#1E3A5F] hover:border-cyan/40 hover:text-white transition-colors">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="border-t border-[#1E3A5F] pt-6 space-y-3">
                                    <h3 className="text-[11px] font-mono text-cyan/60 tracking-[0.2em] uppercase mb-4">&gt; Links</h3>
                                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                                        className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 text-white font-semibold text-sm transition-all group/btn">
                                        <Github size={17} />
                                        <span>View Source Code</span>
                                        <ArrowUpRight size={14} className="opacity-0 group-hover/btn:opacity-100 transition-opacity ml-auto" />
                                    </a>
                                    {project.link && (
                                        <a href={project.link} target="_blank" rel="noopener noreferrer"
                                            className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-cyan/10 border border-cyan/30 hover:bg-cyan/20 hover:border-cyan/60 text-cyan font-semibold text-sm transition-all group/btn"
                                            style={{ boxShadow: "0 0 20px rgba(34,211,238,0.1)" }}>
                                            <ExternalLink size={17} />
                                            <span>Live Demo</span>
                                            <ArrowUpRight size={14} className="opacity-0 group-hover/btn:opacity-100 transition-opacity ml-auto" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, onClick, index }: { project: Project; onClick: () => void; index: number }) {
    const platformCfg = PLATFORM_CONFIG[project.platform]
    const statusCfg = STATUS_CONFIG[project.status]

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            onClick={onClick}
            className="group cursor-pointer relative flex flex-col bg-[#111827] border border-[#1E293B] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2"
            style={{ "--hover-shadow": project.theme === "cyan" ? "rgba(34,211,238,0.2)" : "rgba(100,116,139,0.2)" } as React.CSSProperties}
            onMouseEnter={e => {
                const el = e.currentTarget
                el.style.borderColor = project.theme === "cyan" ? "rgba(34,211,238,0.5)" : "rgba(100,116,139,0.5)"
                el.style.boxShadow = `0 20px 50px ${project.theme === "cyan" ? "rgba(34,211,238,0.15)" : "rgba(100,116,139,0.15)"}, 0 0 0 1px ${project.theme === "cyan" ? "rgba(34,211,238,0.2)" : "rgba(100,116,139,0.2)"}`
            }}
            onMouseLeave={e => {
                const el = e.currentTarget
                el.style.borderColor = ""
                el.style.boxShadow = ""
            }}
        >
            {/* Top accent line */}
            <div className={`h-[2px] w-full ${project.theme === "cyan" ? "bg-gradient-to-r from-cyan via-sky-400 to-transparent" : "bg-gradient-to-r from-slate via-slate-light to-transparent"}`} />

            {/* Gradient glow bg */}
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

            <div className="p-6 flex flex-col flex-1 relative z-10">
                {/* Header row */}
                <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${project.iconBg} transition-all group-hover:scale-110 duration-300`}>
                            {project.icon}
                        </div>
                        <div>
                            {/* Platform badge */}
                            <span className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full border ${platformCfg.bg} ${platformCfg.color} mb-1`}>
                                {platformCfg.icon}
                                {platformCfg.label}
                            </span>
                            {/* Status */}
                            <div className={`flex items-center gap-1.5 text-[10px] font-mono ${statusCfg.color}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot} ${project.status === "active" ? "animate-pulse" : ""}`} />
                                {statusCfg.label}
                            </div>
                        </div>
                    </div>

                    {/* Action icons */}
                    <div className="flex items-center gap-2">
                        {project.link && (
                            <a href={project.link} target="_blank" rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-text-secondary hover:text-cyan hover:bg-cyan/10 transition-all border border-transparent hover:border-cyan/30"
                                aria-label={`Live demo of ${project.title}`}>
                                <ExternalLink size={15} />
                            </a>
                        )}
                        <a href={project.github} target="_blank" rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-text-secondary hover:text-white hover:bg-white/10 transition-all border border-transparent hover:border-white/20"
                            aria-label={`GitHub: ${project.title}`}>
                            <Github size={15} />
                        </a>
                    </div>
                </div>

                {/* Screenshot carousel (only ClickForge) */}
                {project.images && <ImageCarousel images={project.images} />}

                {/* Date */}
                <p className="text-[11px] font-mono text-cyan/50 mb-2">{project.date}</p>

                {/* Title + subtitle */}
                <h3 className="text-lg font-bold text-white mb-0.5 group-hover:text-cyan transition-colors duration-200">
                    {project.title}
                </h3>
                <p className="text-xs text-text-secondary/70 font-medium mb-3">{project.subtitle}</p>

                {/* Description */}
                <p className="text-text-secondary text-sm leading-relaxed line-clamp-3 flex-1 mb-5">
                    {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#1E293B]">
                    {project.tags.slice(0, 4).map((tag) => (
                        <span key={tag}
                            className="text-[10px] font-mono px-2 py-1 rounded bg-[#0F172A] text-text-secondary border border-[#1E293B] group-hover:border-cyan/20 transition-colors">
                            {tag}
                        </span>
                    ))}
                    {project.tags.length > 4 && (
                        <span className="text-[10px] font-mono px-2 py-1 rounded text-text-secondary/50">
                            +{project.tags.length - 4}
                        </span>
                    )}
                </div>

                {/* "Click for details" hint */}
                <div className="mt-4 flex items-center gap-1.5 text-[10px] font-mono text-text-secondary/40 group-hover:text-cyan/60 transition-colors">
                    <Star size={9} />
                    <span>Click to view case study</span>
                </div>
            </div>
        </motion.div>
    )
}

// ─── Category Section ─────────────────────────────────────────────────────────
function CategorySection({ category, projects, onSelect }: {
    category: typeof CATEGORIES[0]
    projects: Project[]
    onSelect: (p: Project) => void
}) {
    if (!projects.length) return null

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mb-16 last:mb-0"
        >
            {/* Category header */}
            <div className={`flex items-center gap-3 mb-8 pb-4 border-b ${category.borderColor}`}>
                <span className={`flex items-center gap-2 ${category.color} font-mono font-semibold text-sm`}>
                    {category.icon}
                    {category.label}
                </span>
                <span className="text-text-secondary/40 font-mono text-xs">
                    ({projects.length} {projects.length === 1 ? "project" : "projects"})
                </span>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {projects.map((project, idx) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        onClick={() => onSelect(project)}
                        index={idx}
                    />
                ))}
            </div>
        </motion.div>
    )
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function Projects() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)

    return (
        <section id="projects" className="py-24 relative z-10 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <div className="section-command">
                        <span className="prompt">&gt;</span>
                        <span className="command">cat</span> projects.json
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
                        Featured <span className="text-cyan">Projects</span>
                    </h2>
                    <p className="text-text-secondary text-base max-w-xl">
                        {PROJECTS.length} projects across Android, Web, and Desktop — click any card for the full case study.
                    </p>
                </motion.div>

                {/* Grouped categories */}
                {CATEGORIES.map((cat) => (
                    <CategorySection
                        key={cat.id}
                        category={cat}
                        projects={PROJECTS.filter((p) => cat.platforms.includes(p.platform))}
                        onSelect={setSelectedProject}
                    />
                ))}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    )
}
