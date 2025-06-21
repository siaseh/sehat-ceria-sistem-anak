
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center group-hover:animate-wiggle">
              <Heart className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">SIASEH</h1>
              <p className="text-xs text-gray-600 -mt-1">Anak Sehat Ceria</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-primary font-medium transition-colors">
              Beranda
            </Link>
            <Link to="/health-info" className="text-gray-700 hover:text-primary font-medium transition-colors">
              Info Kesehatan
            </Link>
            <Link to="/games" className="text-gray-700 hover:text-primary font-medium transition-colors">
              Game Edukasi
            </Link>
            <Link to="/login">
              <Button className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-2 rounded-full">
                Masuk
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3 pt-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-primary font-medium transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Beranda
              </Link>
              <Link 
                to="/health-info" 
                className="text-gray-700 hover:text-primary font-medium transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Info Kesehatan
              </Link>
              <Link 
                to="/games" 
                className="text-gray-700 hover:text-primary font-medium transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Game Edukasi
              </Link>
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-2 rounded-full w-full">
                  Masuk
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
