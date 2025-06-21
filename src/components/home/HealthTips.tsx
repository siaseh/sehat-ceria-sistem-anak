
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Apple, Droplets, Moon, Zap } from 'lucide-react';

const HealthTips = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tipCategories = [
    {
      icon: Apple,
      title: "Makanan Sehat",
      color: "from-kid-green to-green-400",
      tips: [
        "Makan 5 porsi buah dan sayur setiap hari 🥕",
        "Pilih makanan berwarna-warni untuk nutrisi lengkap 🌈",
        "Hindari terlalu banyak permen dan makanan manis 🍭",
        "Sarapan sehat setiap pagi untuk energi seharian ☀️"
      ]
    },
    {
      icon: Droplets,
      title: "Minum Air",
      color: "from-kid-blue to-blue-400",
      tips: [
        "Minum air putih 8 gelas setiap hari 💧",
        "Bawa botol minum ke sekolah 🏫",
        "Minum air sebelum merasa haus 😊",
        "Kurangi minuman manis dan bersoda 🥤"
      ]
    },
    {
      icon: Moon,
      title: "Tidur Cukup",
      color: "from-kid-purple to-purple-400",
      tips: [
        "Tidur 8-10 jam setiap malam 🌙",
        "Tidur dan bangun pada jam yang sama ⏰",
        "Matikan gadget 1 jam sebelum tidur 📱",
        "Buat kamar tidur gelap dan sejuk 🛏️"
      ]
    },
    {
      icon: Zap,
      title: "Olahraga",
      color: "from-kid-orange to-orange-400",
      tips: [
        "Bermain aktif minimal 1 jam setiap hari ⚽",
        "Pilih olahraga yang menyenangkan 🏃‍♂️",
        "Jalan kaki atau bersepeda ke sekolah 🚲",
        "Ikuti kegiatan olahraga di sekolah 🏸"
      ]
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-kid-yellow via-white to-kid-green">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
          Tips Kesehatan untuk Anak Cerdas! 🌟
        </h2>
        <p className="text-xl text-center text-gray-600 mb-12">
          Yuk, ikuti tips ini untuk tumbuh sehat dan kuat!
        </p>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {tipCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === index
                    ? 'bg-primary text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <IconComponent size={20} />
                <span>{category.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tab Content */}
        <div className="max-w-4xl mx-auto">
          <Card className={`border-0 bg-gradient-to-br ${tipCategories[activeTab].color} text-white overflow-hidden`}>
            <CardHeader className="text-center pb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-slow">
                {React.createElement(tipCategories[activeTab].icon, { size: 40 })}
              </div>
              <CardTitle className="text-3xl font-bold">
                {tipCategories[activeTab].title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {tipCategories[activeTab].tips.map((tip, index) => (
                  <div
                    key={index}
                    className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 animate-float"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <p className="text-lg font-medium">{tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HealthTips;
