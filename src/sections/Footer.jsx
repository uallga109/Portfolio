import { Github, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/uallga109', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/uallga109', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com/uallga109', label: 'Instagram' },
  ];

  return (
    <footer className="w-full py-16 flex flex-col items-center gap-6 font-mono text-neutral-400">
      
      {/* Logo */}
      <div className="text-white font-bold text-lg tracking-widest">
        {'>_'} LUISGARCIA
      </div>

      {/* Social Links */}
      <div className="flex items-center gap-6">
        {socialLinks.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="hover:text-[#00f5ff] hover:scale-110 transition-all duration-300 ease-out"
          >
            <Icon size={20} strokeWidth={1.5} />
          </a>
        ))}
      </div>

      {/* Copyright */}
      <div className="text-sm text-neutral-600 mt-2">
        © {currentYear} Luis Garcia
      </div>

    </footer>
  );
}
