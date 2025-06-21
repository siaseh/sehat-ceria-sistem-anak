
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-800 to-gray-900 text-white py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center animate-pulse">
                <Heart className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-primary">SIASEH</h1>
                <p className="text-sm text-gray-300">Sistem Informasi Anak Sehat</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Platform kesehatan yang ceria dan edukatif untuk anak-anak SD. 
              Mari bersama-sama menjaga kesehatan anak Indonesia! 🌟
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary/30 transition-colors cursor-pointer">
                <span className="text-xl">📘</span>
              </div>
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary/30 transition-colors cursor-pointer">
                <span className="text-xl">📷</span>
              </div>
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary/30 transition-colors cursor-pointer">
                <span className="text-xl">🐦</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-secondary">Menu Cepat</h3>
            <ul className="space-y-3">
              <li><a href="/" className="text-gray-300 hover:text-primary transition-colors">Beranda</a></li>
              <li><a href="/health-info" className="text-gray-300 hover:text-primary transition-colors">Info Kesehatan</a></li>
              <li><a href="/games" className="text-gray-300 hover:text-primary transition-colors">Game Edukasi</a></li>
              <li><a href="/login" className="text-gray-300 hover:text-primary transition-colors">Login</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-secondary">Hubungi Kami</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <Mail size={16} className="text-primary" />
                </div>
                <span className="text-gray-300">info@siaseh.id</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <Phone size={16} className="text-primary" />
                </div>
                <span className="text-gray-300">0800-SIASEH-1</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <MapPin size={16} className="text-primary" />
                </div>
                <span className="text-gray-300">Jakarta, Indonesia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 mb-2">
            © 2024 SIASEH - Sistem Informasi Anak Sehat. Semua hak dilindungi.
          </p>
          <p className="text-sm text-gray-500">
            Dibuat dengan ❤️ untuk kesehatan anak-anak Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
