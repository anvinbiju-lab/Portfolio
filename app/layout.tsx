import type { Metadata } from 'next'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://anvinbiju.indevs.in'

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: 'Anvin Biju | Cybersecurity Engineer & Software Developer',
        template: '%s | Anvin Biju',
    },
    description:
        'Official portfolio of Anvin Biju - Cybersecurity Engineer, Software Developer, and Ethical Hacker. Discover projects, security tools, technical skills, and achievements.',
    keywords: [
        'Anvin Biju',
        'Anvin Biju Cybersecurity',
        'Anvin Biju Software Developer',
        'Anvin Biju Portfolio',
        'Cybersecurity Engineer',
        'Software Developer',
        'Ethical Hacking',
        'Android Developer',
        'Next.js Developer',
        'Kerala',
        'India',
    ],
    authors: [{ name: 'Anvin Biju', url: siteUrl }],
    creator: 'Anvin Biju',
    publisher: 'Anvin Biju',
    alternates: {
        canonical: siteUrl,
    },
    icons: {
        icon: [
            { url: '/favicon.ico' },
            { url: '/anvin-biju-cybersecurity-engineer.png', sizes: '48x48', type: 'image/png' },
            { url: '/anvin-biju-cybersecurity-engineer.png', sizes: '192x192', type: 'image/png' },
        ],
        shortcut: '/favicon.ico',
        apple: '/anvin-biju-cybersecurity-engineer.png',
    },
    openGraph: {
        title: 'Anvin Biju | Cybersecurity Engineer & Software Developer',
        description:
            'Official portfolio of Anvin Biju - Cybersecurity Engineer, Software Developer, and Ethical Hacker. Discover projects, security tools, and achievements.',
        url: siteUrl,
        siteName: 'Anvin Biju Portfolio',
        images: [
            {
                url: '/anvin-biju-cybersecurity-engineer.png',
                width: 928,
                height: 1152,
                alt: 'Anvin Biju - Cybersecurity Engineer and Software Developer',
            },
        ],
        type: 'website',
        locale: 'en_US',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Anvin Biju | Cybersecurity Engineer & Software Developer',
        description:
            'Official portfolio of Anvin Biju - Cybersecurity Engineer, Software Developer, and Ethical Hacker.',
        images: ['/anvin-biju-cybersecurity-engineer.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-video-preview': -1,
            'max-snippet': -1,
        },
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Anvin Biju',
    alternateName: ['AnvinBiju', 'Anvin Biju Portfolio'],
    jobTitle: 'Cybersecurity Engineer & Software Developer',
    description:
        'Cybersecurity Engineer, Software Developer, and Ethical Hacker specializing in building security tools, web apps, and Android solutions.',
    url: siteUrl,
    image: `${siteUrl}/anvin-biju-cybersecurity-engineer.png`,
    sameAs: [
        'https://github.com/anvinbiju-lab',
        'https://www.linkedin.com/in/anvin-biju',
    ],
    knowsAbout: [
        'Cybersecurity',
        'Ethical Hacking',
        'Software Engineering',
        'Web Development',
        'Android Development',
        'Next.js',
        'React',
        'TypeScript',
    ],
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="scroll-smooth">
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="icon" type="image/png" sizes="48x48" href="/anvin-biju-cybersecurity-engineer.png" />
                <link rel="apple-touch-icon" href="/anvin-biju-cybersecurity-engineer.png" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className="bg-[#0F172A] text-[#F4F4F4] font-sans antialiased overflow-x-hidden">
                {children}
            </body>
        </html>
    )
}
