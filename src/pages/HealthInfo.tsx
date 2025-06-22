
import { Heart, Shield, Apple, Zap, Users, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const HealthInfo = () => {
  const healthTips = [
    {
      icon: <Apple className="text-kid-green" size={24} />,
      title: "Makan Makanan Bergizi",
      content: "Konsumsi 5 porsi buah dan sayur setiap hari untuk tubuh yang sehat dan kuat!",
      color: "from-kid-green to-green-400"
    },
    {
      icon: <Zap className="text-kid-yellow" size={24} />,
      title: "Olahraga Teratur",
      content: "Lakukan aktivitas fisik minimal 30 menit setiap hari. Bermain, berlari, atau bersepeda!",
      color: "from-kid-yellow to-yellow-400"
    },
    {
      icon: <Shield className="text-kid-blue" size={24} />,
      title: "Cuci Tangan",
      content: "Cuci tangan dengan sabun selama 20 detik sebelum makan dan setelah beraktivitas.",
      color: "from-kid-blue to-blue-400"
    },
    {
      icon: <Heart className="text-kid-pink" size={24} />,
      title: "Tidur Cukup",
      content: "Tidur 8-10 jam setiap malam agar tubuh fit dan siap belajar esok hari!",
      color: "from-kid-pink to-pink-400"
    }
  ];

  const reproductiveEducation = [
    {
      title: "Mengenal Tubuh Kita",
      content: "Setiap bagian tubuh memiliki fungsi penting dan harus dijaga kebersihannya.",
      ageGroup: "6-8 tahun"
    },
    {
      title: "Privasi dan Keamanan",
      content: "Bagian tubuh tertentu adalah privat dan tidak boleh disentuh sembarang orang.",
      ageGroup: "8-10 tahun"
    },
    {
      title: "Perubahan Tubuh",
      content: "Tubuh akan mengalami perubahan seiring bertambahnya usia, dan itu normal.",
      ageGroup: "10-12 tahun"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-kid-blue/20 to-kid-green/20">
      <Header />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center animate-pulse-glow">
                <Heart className="text-white" size={40} />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-primary mb-4">
              Informasi Kesehatan Anak 🌟
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Mari belajar tentang kesehatan dengan cara yang menyenangkan dan mudah dipahami!
            </p>
          </div>

          {/* Health Tips */}
          <section className="mb-16">
            <div className="flex items-center justify-center mb-8">
              <Badge className="bg-kid-green text-white text-lg px-6 py-2">
                <Apple className="mr-2" size={20} />
                Tips Kesehatan Harian
              </Badge>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {healthTips.map((tip, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <CardHeader className={`bg-gradient-to-r ${tip.color} text-white text-center py-6`}>
                    <div className="flex justify-center mb-3">
                      {tip.icon}
                    </div>
                    <CardTitle className="text-lg">{tip.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-gray-600 text-center">{tip.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Reproductive Education */}
          <section className="mb-16">
            <div className="flex items-center justify-center mb-8">
              <Badge className="bg-kid-pink text-white text-lg px-6 py-2">
                <BookOpen className="mr-2" size={20} />
                Edukasi Reproduksi Anak
              </Badge>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <Card className="mb-6 bg-gradient-to-r from-kid-pink/20 to-kid-purple/20">
                <CardHeader>
                  <CardTitle className="text-center text-2xl text-primary">
                    Pendidikan Kesehatan Reproduksi yang Sesuai Usia 📚
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-600 mb-6">
                    Edukasi kesehatan reproduksi yang diberikan sesuai dengan tingkat perkembangan anak
                  </p>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-3 gap-6">
                {reproductiveEducation.map((edu, index) => (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                    <CardHeader className="bg-gradient-to-r from-kid-purple to-purple-400 text-white">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{edu.title}</CardTitle>
                        <Badge className="bg-white/20 text-white">
                          {edu.age}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <p className="text-gray-600">{edu.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Additional Info */}
          <section>
            <Card className="bg-gradient-to-r from-primary to-secondary text-white">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <Users size={48} className="animate-bounce-slow" />
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  Butuh Bantuan? 🤝
                </h3>
                <p className="text-lg mb-6">
                  Jika ada pertanyaan tentang kesehatan, jangan ragu untuk bertanya kepada orang tua, guru, atau dokter!
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div className="bg-white/20 rounded-lg p-4">
                    <div className="text-2xl mb-2">👨‍👩‍👧‍👦</div>
                    <p className="font-semibold">Orang Tua</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <div className="text-2xl mb-2">👩‍🏫</div>
                    <p className="font-semibold">Guru</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <div className="text-2xl mb-2">👨‍⚕️</div>
                    <p className="font-semibold">Dokter</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HealthInfo;
