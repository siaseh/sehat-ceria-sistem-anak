
import React from 'react';
import { Heart, Apple, Droplets, Moon, Activity, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const HealthTips = () => {
  const tips = [
    {
      icon: <Apple className="text-kid-green" size={32} />,
      title: "Makan Buah & Sayur",
      description: "Konsumsi 5 porsi buah dan sayur setiap hari untuk tubuh yang sehat dan kuat!",
      color: "from-kid-green to-green-400"
    },
    {
      icon: <Droplets className="text-kid-blue" size={32} />,
      title: "Minum Air Putih",
      description: "Minum 6-8 gelas air putih setiap hari agar tubuh tidak dehidrasi.",
      color: "from-kid-blue to-blue-400"
    },
    {
      icon: <Activity className="text-kid-orange" size={32} />,
      title: "Olahraga Rutin",
      description: "Bermain dan berolahraga minimal 60 menit setiap hari untuk tubuh bugar!",
      color: "from-kid-orange to-orange-400"
    },
    {
      icon: <Moon className="text-kid-purple" size={32} />,
      title: "Tidur Cukup",
      description: "Tidur 9-11 jam setiap malam agar tubuh fit dan siap belajar esok hari!",
      color: "from-kid-purple to-purple-400"
    },
    {
      icon: <Shield className="text-kid-pink" size={32} />,
      title: "Cuci Tangan",
      description: "Cuci tangan dengan sabun selama 20 detik sebelum makan dan setelah beraktivitas.",
      color: "from-kid-pink to-pink-400"
    },
    {
      icon: <Heart className="text-kid-yellow" size={32} />,
      title: "Jaga Kebersihan",
      description: "Mandi 2 kali sehari dan gosok gigi setelah makan untuk tubuh bersih dan segar!",
      color: "from-kid-yellow to-yellow-400"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-kid-blue/10 to-kid-green/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center animate-pulse-glow">
              <Heart className="text-white" size={32} />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Tips Kesehatan Harian 🌟
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Mari jaga kesehatan dengan kebiasaan baik setiap hari! Ikuti tips sederhana ini untuk tubuh yang sehat dan bahagia.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tips.map((tip, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 overflow-hidden">
              <CardHeader className={`bg-gradient-to-r ${tip.color} text-white text-center py-8`}>
                <div className="flex justify-center mb-4 group-hover:animate-bounce-slow">
                  {tip.icon}
                </div>
                <CardTitle className="text-xl font-bold">{tip.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-6 text-center">
                <p className="text-gray-600 leading-relaxed">{tip.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-primary to-secondary text-white p-8 rounded-2xl shadow-lg">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold mb-2">Ingat Selalu!</h3>
            <p className="text-lg text-white/90">
              Kesehatan adalah kekayaan terbesar. Mari jaga tubuh kita dengan baik setiap hari!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthTips;
