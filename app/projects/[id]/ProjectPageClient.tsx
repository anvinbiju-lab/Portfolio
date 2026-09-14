"use client"

import { useState } from "react"
import { notFound, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import {
    ArrowLeft, Github, ExternalLink, Download, Smartphone,
    Globe, Monitor, Chrome, ChevronLeft, ChevronRight,
    Zap, CheckCircle2, PackageOpen, AlertCircle, ArrowUpRight
} from "lucide-react"
import { getAllProjects, getProjectById, type Platform, type Status } from "@/lib/projects-data"

// ─── Platform & Status helpers ─────────────────────────────────────────────
const PLATFORM_CONFIG: Record<Platform, { label: string; icon: React.ReactNode; color: string; bg: string }> = {
    android: { label: "Android", icon: <Smartphone size={13} />, color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/30" },
    web: { label: "Web App", icon: <Globe size={13} />, color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/30" },
    windows: { label: "Windows", icon: <Monitor size={13} />, color: "text-violet-400", bg: "bg-violet-400/10 border-violet-400/30" },
    chrome: { label: "Extension", icon: <Chrome size={13} />, color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/30" },
}

const STATUS_CONFIG: Record<Status, { label: string; color: string; dot: string }> = {
    active: { label: "In Development", color: "text-amber-400", dot: "bg-amber-400" },
    live: { label: "Live", color: "text-emerald-400", dot: "bg-emerald-400" },
    complete: { label: "Complete", color: "text-cyan", dot: "bg-cyan" },
}

// ─── Screenshot Gallery ────────────────────────────────────────────────────
function ScreenshotGallery({ screenshots }: { screenshots: { src: string; caption: string }[] }) {
    const [active, setActive] = useState(0)

    const prev = () => setActive((p) => (p - 1 + screenshots.length) % screenshots.length)
    const next = () => setActive((p) => (p + 1) % screenshots.length)

    return (
        <div className="w-full">
            {/* Main viewer */}
            <div className="relative w-full rounded-2xl overflow-hidden border border-[#1E3A5F] bg-black group mb-4"
                style={{ maxHeight: "70vh" }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25 }}
                        className="w-full flex items-center justify-center"
                        style={{ maxHeight: "70vh" }}
                    >
                        <Image
                            src={screenshots[active].src}
                            alt={screenshots[active].caption}
                            width={400}
                            height={800}
                            className="object-contain w-full"
                            style={{ maxHeight: "70vh" }}
                            unoptimized
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Nav arrows */}
                {screenshots.length > 1 && (
                    <>
                        <button onClick={prev}
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronLeft size={20} />
                        </button>
                        <button onClick={next}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronRight size={20} />
                        </button>
                    </>
                )}

                {/* Caption overlay */}
                <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-xs font-mono text-white/70 text-center">{screenshots[active].caption}</p>
                </div>
            </div>

            {/* Thumbnails */}
            {screenshots.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {screenshots.map((s, i) => (
                        <button key={i} onClick={() => setActive(i)}
                            className={`shrink-0 w-16 h-28 rounded-lg overflow-hidden border-2 transition-all ${i === active ? "border-cyan scale-105" : "border-transparent opacity-50 hover:opacity-80"}`}>
                            <Image src={s.src} alt={s.caption} width={64} height={112} className="object-cover w-full h-full" unoptimized />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

// ─── Client Page Component ─────────────────────────────────────────────────
export default function ProjectPageClient({ id }: { id: string }) {
    const project = getProjectById(id)
    if (!project) notFound()

    const platformCfg = PLATFORM_CONFIG[project.platform]
    const statusCfg = STATUS_CONFIG[project.status]
    const relatedProjects = getAllProjects()
        .filter((p) => p.id !== id && p.platform === project.platform)
        .slice(0, 3)

    return (
        <div className="min-h-screen bg-[#0F172A] text-[#F4F4F4] overflow-x-hidden">
            {/* Ambient glow */}
            <div className="fixed top-0 left-0 w-[60%] h-[40%] bg-cyan/5 rounded-full blur-[120px] pointer-events-none z-0" />
            <div className="fixed bottom-0 right-0 w-[40%] h-[40%] bg-slate/5 rounded-full blur-[120px] pointer-events-none z-0" />

            {/* Sticky top bar */}
            <header className="sticky top-0 z-50 bg-[#0F172A]/80 backdrop-blur-xl border-b border-[#1E293B]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
                    <Link href="/#projects"
                        className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors text-sm font-medium group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Portfolio
                    </Link>

                    <div className="flex items-center gap-3">
                        {project.link && (
                            <a href={project.link} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-xs font-mono text-cyan border border-cyan/30 px-3 py-1.5 rounded-lg hover:bg-cyan/10 transition-all">
                                <ExternalLink size={12} /> Live Demo
                            </a>
                        )}
                        <a href={project.github} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs font-mono text-text-secondary border border-[#334155] px-3 py-1.5 rounded-lg hover:border-white/30 hover:text-white transition-all">
                            <Github size={12} /> GitHub
                        </a>
                    </div>
                </div>
            </header>

            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16">

                {/* ── Hero ─────────────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 md:mb-16"
                >
                    <div className="flex items-center gap-3 mb-5 flex-wrap">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full border ${platformCfg.bg} ${platformCfg.color}`}>
                            {platformCfg.icon}{platformCfg.label}
                        </span>
                        <span className={`inline-flex items-center gap-2 text-xs font-mono ${statusCfg.color}`}>
                            <span className={`w-2 h-2 rounded-full ${statusCfg.dot} ${project.status === "active" ? "animate-pulse" : ""}`} />
                            {statusCfg.label}
                        </span>
                        <span className="text-text-secondary/50 font-mono text-xs">{project.date}</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-3">
                        {project.title}
                    </h1>
                    <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed">
                        {project.subtitle}
                    </p>
                </motion.div>

                {/* ── Main grid ────────────────────────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">

                    {/* Left column — content (3/5) */}
                    <div className="lg:col-span-3 space-y-12">

                        {/* Screenshots */}
                        {project.screenshots && project.screenshots.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 }}>
                                <h2 className="text-[11px] font-mono text-cyan/50 tracking-[0.25em] uppercase mb-5">&gt; Screenshots</h2>
                                <ScreenshotGallery screenshots={project.screenshots} />
                            </motion.div>
                        )}

                        {/* Overview */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                            <h2 className="text-[11px] font-mono text-cyan/50 tracking-[0.25em] uppercase mb-4">&gt; Overview</h2>
                            <p className="text-text-secondary leading-relaxed text-base md:text-lg">
                                {project.longDescription || project.description}
                            </p>
                        </motion.div>

                        {/* Features */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                            <h2 className="text-[11px] font-mono text-cyan/50 tracking-[0.25em] uppercase mb-5">&gt; Key Features</h2>
                            <ul className="space-y-4">
                                {project.features.map((f, i) => (
                                    <motion.li key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + i * 0.06 }}
                                        className="flex items-start gap-4 p-4 rounded-xl bg-[#111827] border border-[#1E293B] hover:border-cyan/20 transition-colors">
                                        <span className="mt-0.5 w-6 h-6 rounded-lg bg-cyan/10 border border-cyan/30 flex items-center justify-center shrink-0">
                                            <Zap size={12} className="text-cyan" />
                                        </span>
                                        <span className="text-text-secondary leading-relaxed text-sm">{f}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Install steps */}
                        {project.installSteps && project.installSteps.length > 0 && (
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                                <h2 className="text-[11px] font-mono text-cyan/50 tracking-[0.25em] uppercase mb-5">&gt; How to Install</h2>

                                {/* Sideload warning for Android */}
                                {project.platform === "android" && project.apkUrl && (
                                    <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-400/5 border border-amber-400/20 mb-6">
                                        <AlertCircle size={16} className="text-amber-400 shrink-0 mt-0.5" />
                                        <p className="text-xs text-amber-400/80 leading-relaxed">
                                            This is a sideloaded APK — not available on the Play Store yet. You&apos;ll need to enable <strong>Install Unknown Apps</strong> on your device to install it.
                                        </p>
                                    </div>
                                )}

                                <ol className="space-y-4">
                                    {project.installSteps.map((s, i) => (
                                        <li key={i} className="flex items-start gap-4">
                                            <span className="w-7 h-7 rounded-full bg-[#1E293B] border border-cyan/30 flex items-center justify-center text-cyan font-mono text-xs font-bold shrink-0 mt-0.5">
                                                {i + 1}
                                            </span>
                                            <div>
                                                <p className="text-white font-semibold text-sm mb-0.5">{s.step}</p>
                                                {s.detail && <p className="text-text-secondary text-xs leading-relaxed">{s.detail}</p>}
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            </motion.div>
                        )}

                        {/* Web usage instructions */}
                        {project.platform === "web" && project.link && (
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                                <h2 className="text-[11px] font-mono text-cyan/50 tracking-[0.25em] uppercase mb-5">&gt; How to Use</h2>
                                <div className="p-5 rounded-xl bg-[#111827] border border-[#1E293B] flex items-start gap-4">
                                    <Globe size={18} className="text-cyan shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-white font-semibold text-sm mb-1">Open in your browser</p>
                                        <p className="text-text-secondary text-xs leading-relaxed mb-3">
                                            No installation required — just visit the live site and start using it instantly.
                                        </p>
                                        <a href={project.link} target="_blank" rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-xs font-mono text-cyan hover:underline">
                                            {project.link} <ArrowUpRight size={12} />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Right sidebar (2/5) */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Download / CTA card */}
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                            className="sticky top-20 space-y-4">

                            {/* APK Download */}
                            {project.apkUrl && (
                                <div className="p-5 rounded-2xl bg-[#111827] border border-[#1E3A5F]"
                                    style={{ boxShadow: "0 0 40px rgba(34,211,238,0.06)" }}>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-rose-400/10 border border-rose-400/30 flex items-center justify-center">
                                            <PackageOpen size={18} className="text-rose-400" />
                                        </div>
                                        <div>
                                            <p className="text-white font-bold text-sm">Download APK</p>
                                            <p className="text-text-secondary text-xs font-mono">
                                                v{project.apkVersion} · {project.apkSize}
                                            </p>
                                        </div>
                                    </div>

                                    <a href={project.apkUrl} download
                                        className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl font-bold text-sm text-[#0F172A] transition-all mb-3"
                                        style={{ background: "linear-gradient(135deg, #22D3EE, #3B82F6)", boxShadow: "0 0 30px rgba(34,211,238,0.25)" }}>
                                        <Download size={17} />
                                        Download APK
                                    </a>

                                    {project.minSdk && (
                                        <p className="text-center text-[11px] text-text-secondary/50 font-mono">
                                            Requires {project.minSdk}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Live demo CTA (web/no APK) */}
                            {project.link && !project.apkUrl && (
                                <a href={project.link} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl font-bold text-[#0F172A] text-sm transition-all"
                                    style={{ background: "linear-gradient(135deg, #22D3EE, #3B82F6)", boxShadow: "0 0 30px rgba(34,211,238,0.2)" }}>
                                    <ExternalLink size={17} />
                                    Open Live Demo
                                </a>
                            )}

                            {/* GitHub */}
                            <a href={project.github} target="_blank" rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl font-semibold text-white text-sm bg-[#111827] border border-[#1E293B] hover:border-white/20 transition-all group/gh">
                                <Github size={17} />
                                View Source Code
                                <ArrowUpRight size={14} className="opacity-0 group-hover/gh:opacity-100 transition-opacity ml-auto mr-1" />
                            </a>

                            {/* Tech stack */}
                            <div className="p-5 rounded-2xl bg-[#111827] border border-[#1E293B]">
                                <p className="text-[11px] font-mono text-cyan/50 tracking-[0.2em] uppercase mb-4">&gt; Tech Stack</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span key={tag}
                                            className="text-[11px] font-mono px-2.5 py-1.5 rounded-lg bg-[#0F172A] text-text-secondary border border-[#1E293B] hover:border-cyan/30 hover:text-white transition-colors">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Requirements (Android) */}
                            {project.minSdk && !project.apkUrl && (
                                <div className="p-5 rounded-2xl bg-[#111827] border border-[#1E293B]">
                                    <p className="text-[11px] font-mono text-cyan/50 tracking-[0.2em] uppercase mb-3">&gt; Requirements</p>
                                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                                        <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                                        {project.minSdk}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>

                {/* ── Related Projects ──────────────────────────────────── */}
                {relatedProjects.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-20 pt-10 border-t border-[#1E293B]"
                    >
                        <h2 className="text-[11px] font-mono text-cyan/50 tracking-[0.25em] uppercase mb-6">&gt; More {platformCfg.label} Projects</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {relatedProjects.map((p) => (
                                <Link key={p.id} href={`/projects/${p.id}`}
                                    className="p-4 rounded-xl bg-[#111827] border border-[#1E293B] hover:border-cyan/30 transition-all group/rel flex items-center gap-3">
                                    <span className="text-2xl">{p.iconEmoji}</span>
                                    <div className="min-w-0">
                                        <p className="text-white font-semibold text-sm group-hover/rel:text-cyan transition-colors truncate">{p.title}</p>
                                        <p className="text-text-secondary text-xs truncate">{p.subtitle}</p>
                                    </div>
                                    <ArrowUpRight size={14} className="text-text-secondary group-hover/rel:text-cyan transition-colors shrink-0 ml-auto" />
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </main>
        </div>
    )
}
