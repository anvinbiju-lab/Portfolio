"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, CheckCircle2 } from "lucide-react"

export default function Contact() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500))

        setIsSubmitting(false)
        setIsSuccess(true)
        setFormData({ name: "", email: "", message: "" })

        // Reset success state after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000)
    }

    return (
        <section id="contact" className="py-24 relative z-10 bg-black/40 border-t border-cyan-900/20">
            <div className="absolute inset-0 grid-pattern opacity-30 mix-blend-screen pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-16 text-center"
                >
                    <div className="section-command inline-block mb-4">
                        <span className="prompt">&gt;</span>
                        <span className="command">ping</span> anvin
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                        Initiate <span className="text-slate text-glow-slate">Connection</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                    {/* Left: Terminal Info Block */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="bg-[#1E293B] border border-[#334155] rounded-xl p-8 font-mono text-sm leading-relaxed shadow-lg h-fit"
                    >
                        <div className="flex items-center gap-2 mb-6 border-b border-[#334155] pb-4">
                            <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                            <span className="ml-2 text-text-secondary text-xs">contact.json</span>
                        </div>

                        <div className="space-y-4">
                            <div className="flex">
                                <span className="text-cyan w-24 shrink-0">name</span>
                                <span className="text-white">: "Anvin Biju"</span>
                            </div>
                            <div className="flex">
                                <span className="text-cyan w-24 shrink-0">email</span>
                                <span className="text-slate hover:underline hover:text-slate-light transition-colors"><a href="mailto:anvinbiju1@gmail.com">: "anvinbiju1@gmail.com"</a></span>
                            </div>
                            <div className="flex">
                                <span className="text-cyan w-24 shrink-0">phone</span>
                                <span className="text-gold">: "+91 9605057773"</span>
                            </div>
                            <div className="flex">
                                <span className="text-cyan w-24 shrink-0">linkedin</span>
                                <span className="text-slate hover:underline hover:text-slate-light transition-colors"><a href="https://www.linkedin.com/in/anvin-biju" target="_blank">: "linkedin.com/in/anvin-biju"</a></span>
                            </div>
                            <div className="flex">
                                <span className="text-cyan w-24 shrink-0">github</span>
                                <span className="text-slate hover:underline hover:text-slate-light transition-colors"><a href="https://github.com/anvinbiju-lab" target="_blank">: "github.com/anvinbiju-lab"</a></span>
                            </div>
                            <div className="flex">
                                <span className="text-cyan w-24 shrink-0">location</span>
                                <span className="text-white">: "Ernakulam, Kerala, India"</span>
                            </div>
                            <div className="flex">
                                <span className="text-cyan w-24 shrink-0">status</span>
                                <span className="text-success">: "Open to opportunities ✅"</span>
                            </div>
                            <div className="mt-8 pt-4 border-t border-[#334155] text-text-secondary/50">
                                <span className="text-success mr-2">visitor@anvin:~$</span>
                                <span className="terminal-cursor" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2 font-mono">
                                    &gt; ENTER_NAME
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    className="form-input"
                                    placeholder=""
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2 font-mono">
                                    &gt; ENTER_EMAIL
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    className="form-input"
                                    placeholder=""
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2 font-mono">
                                    &gt; ENTER_MESSAGE
                                </label>
                                <textarea
                                    id="message"
                                    required
                                    rows={5}
                                    className="form-input resize-none"
                                    placeholder=""
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting || isSuccess}
                                className={`w-full py-4 rounded-lg font-bold flex items-center justify-center transition-all ${isSuccess
                                    ? "bg-success/20 text-success border border-success/50"
                                    : "bg-cyan hover:bg-cyan-light text-white glow-cyan"
                                    }`}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        TRANSMITTING...
                                    </span>
                                ) : isSuccess ? (
                                    <span className="flex items-center">
                                        <CheckCircle2 size={20} className="mr-2" />
                                        TRANSMISSION SUCCESSFUL
                                    </span>
                                ) : (
                                    <span className="flex items-center group">
                                        <Send size={18} className="mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        SEND PACKET
                                    </span>
                                )}
                            </button>

                        </form>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}
