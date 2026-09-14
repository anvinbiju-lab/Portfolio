import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAllProjects, getProjectById } from "@/lib/projects-data"
import ProjectPageClient from "./ProjectPageClient"

interface Props {
    params: { id: string }
}

// Generate static paths for all projects
export async function generateStaticParams() {
    return getAllProjects().map((p) => ({ id: p.id }))
}

// Per-project SEO metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const project = getProjectById(params.id)
    if (!project) return { title: "Project Not Found" }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://anvinbiju.indevs.in"

    return {
        title: `${project.title} — ${project.subtitle}`,
        description: project.description,
        openGraph: {
            title: `${project.title} | Anvin Biju`,
            description: project.description,
            url: `${siteUrl}/projects/${project.id}`,
            siteName: "Anvin Biju Portfolio",
            type: "article",
        },
        twitter: {
            card: "summary",
            title: `${project.title} | Anvin Biju`,
            description: project.description,
        },
        alternates: {
            canonical: `${siteUrl}/projects/${project.id}`,
        },
    }
}

export default function ProjectPage({ params }: Props) {
    const project = getProjectById(params.id)
    if (!project) notFound()
    return <ProjectPageClient id={params.id} />
}
