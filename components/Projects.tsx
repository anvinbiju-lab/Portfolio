"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
    Shield, MousePointerClick, Users, Github,
    Bot, ShieldCheck, Lock, Wifi, Smartphone,
    Globe, Monitor, Chrome, Star, ArrowUpRight,
    TimerOff, Download, ExternalLink
} from "lucide-react"
import { getAllProjects, type Project, type Platform, type Status } from "@/lib/projects-data"

// ─── Icon map (client-side JSX, keyed by project id) ─────────────────────
const ICON_MAP: Record<string, React.ReactNode> = {
    scanmatrix:  <Shield size={22} className="text-cyan" />,
    lockin:      <TimerOff size={22} className="text-rose-400" />,
    "jarvis-lite": <Bot size={22} className="text-violet-400" />,
    wistream:    <Wifi size={22} className="text-cyan" />,
    cyberscan:   <ShieldCheck size={22} className="text-cyan" />,
    keyguard:    <Lock size={22} className="text-slate-light" />,
    clickforge:  <MousePointerClick size={22} className="text-violet-400" />,
    instagram:   <Users size={22} className="text-amber-400" />,
}

// ─── Platform & Status config ─────────────────────────────────────────────
const PLATFORM_CONFIG: Record<Platform, { label: string; icon: React.ReactNode; color: string; bg: string }> = {
    android: { label: "Android",   icon: <Smartphone size={11} />, color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/30" },
    web:     { label: "Web App",   icon: <Globe size={11} />,      color: "text-blue-400",    bg: "bg-blue-400/10 border-blue-400/30" },
    windows: { label: "Windows",   icon: <Monitor size={11} />,    color: "text-violet-400",  bg: "bg-violet-400/10 border-violet-400/30" },
    chrome:  { label: "Extension", icon: <Chrome size={11} />,     color: "text-amber-400",   bg: "bg-amber-400/10 border-amber-400/30" },
}

const STATUS_CONFIG: Record<Status, { label: string; color: string; dot: string }> = {
    active:   { label: "In Dev",    color: "text-amber-400",   dot: "bg-amber-400" },
    live:     { label: "Live",      color: "text-emerald-400", dot: "bg-emerald-400" },
    complete: { label: "Complete",  color: "text-cyan",        dot: "bg-cyan" },
}

const CATEGORIES = [
    { id: "android", label: "Android Apps",             icon: <Smartphone size={16} />, color: "text-emerald-400", borderColor: "border-emerald-400/40", platforms: ["android"] as Platform[] },
    { id: "web",     label: "Web Apps",                 icon: <Globe size={16} />,      color: "text-blue-400",    borderColor: "border-blue-400/40",    platforms: ["web"] as Platform[] },
    { id: "tools",   label: "Desktop & Browser Tools",  icon: <Monitor size={16} />,    color: "text-violet-400",  borderColor: "border-violet-400/40",  platforms: ["windows", "chrome"] as Platform[] },
]

// ─── Project Card ─────────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: Project; index: number }) {
    const platformCfg = PLATFORM_CONFIG[project.platform]
    const statusCfg   = STATUS_CONFIG[project.status]
    const icon        = ICON_MAP[project.id]

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
        >
            <Link
                href={`/projects/${project.id}`}
                className="group flex flex-col bg-[#111827] border border-[#1E293B] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 h-full"
                style={{ display: "flex" }}
                onMouseEnter={e => {
                    const el = e.currentTarget
                    el.style.borderColor = project.theme === "cyan" ? "rgba(34,211,238,0.5)" : "rgba(100,116,139,0.5)"
                    el.style.boxShadow   = `0 20px 50px ${project.theme === "cyan" ? "rgba(34,211,238,0.15)" : "rgba(100,116,139,0.15)"}, 0 0 0 1px ${project.theme === "cyan" ? "rgba(34,211,238,0.2)" : "rgba(100,116,139,0.2)"}`
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.borderColor = ""
                    e.currentTarget.style.boxShadow   = ""
                }}
            >
                {/* Accent line */}
                <div className={`h-[2px] w-full ${project.theme === "cyan" ? "bg-gradient-to-r from-cyan via-sky-400 to-transparent" : "bg-gradient-to-r from-slate via-slate-light to-transparent"}`} />

                {/* Gradient hover glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div className="p-6 flex flex-col flex-1 relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-5">
                        <div className="flex items-center gap-3">
                            <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${project.iconBg} transition-all group-hover:scale-110 duration-300`}>
                                {icon}
                            </div>
                            <div>
                                <span className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full border ${platformCfg.bg} ${platformCfg.color} mb-1`}>
                                    {platformCfg.icon}{platformCfg.label}
                                </span>
                                <div className={`flex items-center gap-1.5 text-[10px] font-mono ${statusCfg.color}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot} ${project.status === "active" ? "animate-pulse" : ""}`} />
                                    {statusCfg.label}
                                </div>
                            </div>
                        </div>

                        {/* Quick action icons — stop propagation to avoid double-navigate */}
                        <div className="flex items-center gap-2">
                            {project.apkUrl && (
                                <a href={project.apkUrl} download
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-text-secondary hover:text-cyan hover:bg-cyan/10 transition-all border border-transparent hover:border-cyan/30"
                                    aria-label={`Download ${project.title} APK`}>
                                    <Download size={15} />
                                </a>
                            )}
                            {project.link && (
                                <a href={project.link} target="_blank" rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-text-secondary hover:text-cyan hover:bg-cyan/10 transition-all border border-transparent hover:border-cyan/30"
                                    aria-label={`Live demo: ${project.title}`}>
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

                    {/* Date */}
                    <p className="text-[11px] font-mono text-cyan/50 mb-2">{project.date}</p>

                    {/* Title + subtitle */}
                    <h3 className="text-lg font-bold text-white mb-0.5 group-hover:text-cyan transition-colors duration-200">{project.title}</h3>
                    <p className="text-xs text-text-secondary/70 font-medium mb-3">{project.subtitle}</p>

                    {/* Description */}
                    <p className="text-text-secondary text-sm leading-relaxed line-clamp-3 flex-1 mb-5">{project.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#1E293B]">
                        {project.tags.slice(0, 4).map((tag) => (
                            <span key={tag} className="text-[10px] font-mono px-2 py-1 rounded bg-[#0F172A] text-text-secondary border border-[#1E293B] group-hover:border-cyan/20 transition-colors">
                                {tag}
                            </span>
                        ))}
                        {project.tags.length > 4 && (
                            <span className="text-[10px] font-mono px-2 py-1 rounded text-text-secondary/50">+{project.tags.length - 4}</span>
                        )}
                    </div>

                    {/* CTA hint */}
                    <div className="mt-4 flex items-center gap-1.5 text-[10px] font-mono text-text-secondary/40 group-hover:text-cyan/60 transition-colors">
                        <Star size={9} />
                        <span>View full case study</span>
                        <ArrowUpRight size={10} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}

// ─── Category Section ─────────────────────────────────────────────────────
function CategorySection({ category, projects }: { category: typeof CATEGORIES[0]; projects: Project[] }) {
    if (!projects.length) return null
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mb-16 last:mb-0"
        >
            <div className={`flex items-center gap-3 mb-8 pb-4 border-b ${category.borderColor}`}>
                <span className={`flex items-center gap-2 ${category.color} font-mono font-semibold text-sm`}>
                    {category.icon}{category.label}
                </span>
                <span className="text-text-secondary/40 font-mono text-xs">
                    ({projects.length} {projects.length === 1 ? "project" : "projects"})
                </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {projects.map((project, idx) => (
                    <ProjectCard key={project.id} project={project} index={idx} />
                ))}
            </div>
        </motion.div>
    )
}

// ─── Main Export ──────────────────────────────────────────────────────────
export default function Projects() {
    const PROJECTS = getAllProjects()

    return (
        <section id="projects" className="py-24 relative z-10 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

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

                {CATEGORIES.map((cat) => (
                    <CategorySection
                        key={cat.id}
                        category={cat}
                        projects={PROJECTS.filter((p) => cat.platforms.includes(p.platform))}
                    />
                ))}
            </div>
        </section>
    )
}
