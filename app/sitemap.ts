import { MetadataRoute } from 'next'
import { getAllProjects } from '@/lib/projects-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://anvinbiju.indevs.in'

  const projectPages = getAllProjects().map((p) => ({
    url: `${siteUrl}/projects/${p.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...projectPages,
  ]
}
