import { useTranslation } from '../../../hooks/use-translation'
import {
  Trophy,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Github,
  Heart,
  ArrowUp,
  Sparkles
} from 'lucide-react'

const Footer = () => {
  const { t } = useTranslation()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-blue-900/60 to-indigo-900 border-t border-slate-700/50">
      {/* Decorative top border */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-blue-500/30 via-indigo-500/40 to-blue-500/30" />

      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-indigo-500/8 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg group-hover:scale-110 transition-all duration-300">
                  <div className="absolute inset-0.5 bg-slate-900/90 rounded-lg" />
                  <Trophy className="relative w-6 h-6 text-blue-400 drop-shadow-sm" />
                </div>
                <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-400 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl leading-none bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                  {t('app.title')}
                </span>
                <span className="text-xs text-slate-400 leading-none font-medium tracking-wide">{t('app.slogan')}</span>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed">{t('app.description')}</p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: '#', color: 'hover:text-blue-400' },
                { icon: Twitter, href: '#', color: 'hover:text-sky-400' },
                { icon: Instagram, href: '#', color: 'hover:text-pink-400' },
                { icon: Github, href: '#', color: 'hover:text-slate-300' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`text-slate-500 ${social.color} transition-all duration-300 hover:scale-110 hover:-translate-y-1`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
              Quick Links
            </h3>
            <div className="space-y-3">
              {[
                { key: 'navigation.home', href: '/' },
                { key: 'navigation.sports', href: '/sports' },
                { key: 'navigation.tours', href: '/tours' },
                { key: 'navigation.about', href: '/about' },
                { key: 'navigation.contact', href: '/contact' }
              ].map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  className="block text-slate-400 hover:text-white transition-colors duration-200 text-sm hover:translate-x-1 transform"
                >
                  {t(link.key)}
                </a>
              ))}
            </div>
          </div>

          {/* Sports Categories */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
              Sports
            </h3>
            <div className="space-y-3">
              {['Football', 'Basketball', 'Badminton', 'Table Tennis', 'Volleyball', 'E-Sports'].map((sport) => (
                <a
                  key={sport}
                  href="#"
                  className="block text-slate-400 hover:text-white transition-colors duration-200 text-sm hover:translate-x-1 transform"
                >
                  {sport}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-pink-500 to-red-500 rounded-full" />
              Contact
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>contact@easytoursport.com</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <Phone className="w-4 h-4 text-green-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start gap-3 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 text-red-400 mt-0.5" />
                <span>
                  123 Sports Avenue
                  <br />
                  Tournament City, TC 12345
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-slate-700/50">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <span>© 2024 EasyTourSport. Made with</span>
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
              <span>for sports enthusiasts</span>
            </div>

            <div className="flex items-center gap-6">
              <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-all duration-200 hover:scale-105"
              >
                <span>Back to top</span>
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
