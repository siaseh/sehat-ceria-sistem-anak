
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Shield, BookOpen, Gamepad2, Stethoscope, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HealthTips from '@/components/home/HealthTips';
import EducationSection from '@/components/home/EducationSection';

const Index = () => {
  const [currentTip, setCurrentTip] = useState(0);

  const healthTips = [
    "Cuci tangan dengan sabun selama 20 detik sebelum makan!",
    "Minum air putih minimal 8 gelas sehari untuk tubuh sehat!",
    "Tidur yang cukup 8-10 jam setiap malam untuk tumbuh kembang optimal!",
    "Olahraga ringan 30 menit setiap hari membuat tubuh kuat!"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % healthTips.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-kid-blue via-white to-kid-pink">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-bounce-slow">
              SIASEH
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
              Sistem Informasi Anak Sehat
            </p>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Platform kesehatan yang ceria dan edukatif untuk anak-anak SD. 
              Mari belajar hidup sehat dengan cara yang menyenangkan! 🌟
            </p>
            
            {/* Animated Health Tip */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 mb-8 animate-pulse-glow">
              <div className="flex items-center justify-center mb-3">
                <Heart className="text-primary mr-2 animate-pulse" size={24} />
                <span className="font-semibold text-primary">Tips Kesehatan Hari Ini</span>
                <Heart className="text-primary ml-2 animate-pulse" size={24} />
              </div>
              <p className="text-lg font-medium text-gray-700 animate-fade-in">
                {healthTips[currentTip]}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/login">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 text-lg rounded-full animate-float">
                  <Users className="mr-2" size={20} />
                  Masuk ke Akun
                </Button>
              </Link>
              <Link to="/health-info">
                <Button variant="outline" size="lg" className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-white font-semibold px-8 py-4 text-lg rounded-full animate-float" style={{ animationDelay: '0.5s' }}>
                  <BookOpen className="mr-2" size={20} />
                  Info Kesehatan
                </Button>
              </Link>
              <Link to="/games">
                <Button variant="outline" size="lg" className="border-2 border-success text-success hover:bg-success hover:text-white font-semibold px-8 py-4 text-lg rounded-full animate-float" style={{ animationDelay: '1s' }}>
                  <Gamepad2 className="mr-2" size={20} />
                  Game Edukasi
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
            Fitur Menarik SIASEH 🌈
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12">
            Semua yang dibutuhkan untuk menjaga kesehatan anak-anak SD
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-kid-pink to-white border-0 animate-float">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-wiggle">
                  <Stethoscope className="text-white" size={32} />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">Monitoring Kesehatan</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Pantau kesehatan anak dengan mudah dan menyenangkan
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-kid-blue to-white border-0 animate-float" style={{ animationDelay: '0.2s' }}>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4 animate-wiggle" style={{ animationDelay: '0.2s' }}>
                  <Gamepad2 className="text-white" size={32} />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">Game Edukasi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Belajar kesehatan sambil bermain game seru
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-kid-green to-white border-0 animate-float" style={{ animationDelay: '0.4s' }}>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4 animate-wiggle" style={{ animationDelay: '0.4s' }}>
                  <BookOpen className="text-white" size={32} />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">Edukasi Kesehatan</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Materi edukasi kesehatan yang mudah dipahami
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-kid-yellow to-white border-0 animate-float" style={{ animationDelay: '0.6s' }}>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-warning rounded-full flex items-center justify-center mx-auto mb-4 animate-wiggle" style={{ animationDelay: '0.6s' }}>
                  <Shield className="text-white" size={32} />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">Sistem Aman</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Data kesehatan anak tersimpan dengan aman
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Health Tips Section */}
      <HealthTips />

      {/* Education Section */}
      <EducationSection />

      {/* Role Information */}
      <section className="py-16 px-4 bg-gradient-to-r from-kid-purple via-white to-kid-orange">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Siapa Saja Yang Menggunakan SIASEH? 👥
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-3xl hover:shadow-xl transition-all duration-300 animate-float">
              <div className="text-6xl mb-4">👦</div>
              <h3 className="text-xl font-bold text-primary mb-2">Siswa</h3>
              <p className="text-gray-600">Input data kesehatan, keluhan, dan bermain game edukasi</p>
            </div>
            
            <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-3xl hover:shadow-xl transition-all duration-300 animate-float" style={{ animationDelay: '0.2s' }}>
              <div className="text-6xl mb-4">👩‍🏫</div>
              <h3 className="text-xl font-bold text-secondary mb-2">Guru</h3>
              <p className="text-gray-600">Monitor kesehatan siswa dan menanggapi keluhan</p>
            </div>
            
            <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-3xl hover:shadow-xl transition-all duration-300 animate-float" style={{ animationDelay: '0.4s' }}>
              <div className="text-6xl mb-4">👨‍💼</div>
              <h3 className="text-xl font-bold text-success mb-2">Admin Sekolah</h3>
              <p className="text-gray-600">Kelola akun guru dan siswa di sekolah</p>
            </div>
            
            <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-3xl hover:shadow-xl transition-all duration-300 animate-float" style={{ animationDelay: '0.6s' }}>
              <div className="text-6xl mb-4">👑</div>
              <h3 className="text-xl font-bold text-warning mb-2">Super Admin</h3>
              <p className="text-gray-600">Kelola semua admin sekolah dan sistem</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
