import { FaDiscord, FaWhatsapp, FaInstagram, FaTiktok, FaGithub } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="mt-3">
      <div className="flex flex-col sm:flex-row justify-center items-center text-center sm:text-left">
        <p className="text-sm text-muted-foreground mb-2 sm:mb-0">
          Coded by <a href="https://karma.yt/?pollinations">Karma.yt</a> with <a href="https://pollinations.ai/#karma">Pollinations.ai</a>
        </p>
      </div>
      <div className="flex justify-center space-x-4 mt-2">
        <a href="https://discord.gg/BZWmGNK44Q" className="text-muted-foreground hover:text-foreground">
          <FaDiscord />
        </a>
        <a href="https://chat.whatsapp.com/JxQEn2FKDny0DdwkDuzoQR" className="text-muted-foreground hover:text-foreground">
          <FaWhatsapp />
        </a>
        <a href="https://www.github.com/pollinations/pollinations" className="text-muted-foreground hover:text-foreground">
          <FaGithub />
        </a>
        <a href="https://instagram.com/pollinations_ai" className="text-muted-foreground hover:text-foreground">
          <FaInstagram />
        </a>
        <a href="https://tiktok.com/@pollinations.ai" className="text-muted-foreground hover:text-foreground">
          <FaTiktok />
        </a>
      </div>
    </footer>

  )
}

