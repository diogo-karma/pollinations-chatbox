import type { Metadata } from 'next'
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"
import './globals.css'

const title = "Pollinations Chatbox - Karma.yt Experiment"
const description = "An experimental chat interface powered by Karma.yt, utilizing the advanced AI and image generation capabilities of Pollinations."

export const metadata: Metadata = {
  metadataBase: new URL('https://karma.pollinations.ai'),
  title,
  description,
  keywords: [
    "Pollinations Chatbox",
    "Karma.yt",
    "Pollinations.ai",
    "AI experiment",
    "text and image generation",
    "Next.js",
    "Tailwind CSS",
    "Shadcn UI",
    "flux",
    "flux-realism",
    "flux-cablyai",
    "flux-anime",
    "flux-3d",
    "any-dark",
    "flux-pro",
    "turbo",
    "OpenAI GPT-4o",
    "Qwen",
    "Llama",
    "Mistral",
    "Unity",
    "Unity with Mistral Large by Unity AI Lab",
    "Midijourney",
    "Rtist",
    "SearchGPT",
    "OptiLLM",
    "DeepSeek",
    "Machine Learning",
    "Deep Learning",
    "Vercel",
    "Nextjs",
    "Nodejs",
    "Pollinations.ai",
    "localstorage",
    "conversation models",
    "AI models",
    "chatbots",
    "image generation",
    "GPT vision",
    "creative prompts",
    "conversation AI",
    "model interaction",
    "open source",
    "alpha version",
    "developer tools",
    "react",
    "web development",
    "programming",
    "tech experimentation",
    "pollinations discord",
    "Pollinations AI community",
    "WhatsApp group"
  ],
  openGraph: {
    title,
    description,
    type: 'website',
    url: 'https://karma.pollinations.ai',
  },
  authors: [{ name: 'Diogo Karma', url: 'https://karma.yt' }],
  category: 'Technology',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-4QJ7GS0M0S"
      />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-4QJ7GS0M0S');
            `
          }}
        /></head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

