"use client"

import { Github, Linkedin } from "lucide-react"

export default function Footer() {
    return (
        <footer className="py-8 relative z-10 bg-[#0F172A] border-t border-cyan shadow-[0_-10px_30px_rgba(34,211,238,0.2)] text-center">
            <div className="max-w-6xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">

                <div className="text-slate font-mono text-sm flex items-center">
                    <span className="text-cyan mr-2">&copy;</span>
                    Anvin Biju 2026. All rights reserved.
                </div>

                <div className="flex items-center gap-4 text-slate">
                    <a
                        href="https://github.com/anvinbiju-lab"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-glow-cyan hover:text-white transition-all transform hover:scale-110"
                        aria-label="GitHub"
                    >
                        <Github size={20} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/anvin-biju"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-glow-cyan hover:text-white transition-all transform hover:scale-110"
                        aria-label="LinkedIn"
                    >
                        <Linkedin size={20} />
                    </a>
                </div>
            </div>
        </footer>
    )
}
