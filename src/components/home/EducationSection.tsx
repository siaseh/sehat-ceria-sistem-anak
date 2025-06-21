
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Shield } from 'lucide-react';

const EducationSection = () => {
  const educationTopics = [
    {
      title: "Kebersihan Diri",
      description: "Belajar cara menjaga kebersihan tubuh dengan benar",
      icon: "🧼",
      content: [
        "Cara cuci tangan yang benar",
        "Menjaga kebersihan gigi dan mulut",
        "Pentingnya mandi setiap hari",
        "Memotong kuku dengan rutin"
      ]
    },
    {
      title: "Makanan Bergizi",
      description: "Mengenal makanan sehat untuk tumbuh kembang optimal",
      icon: "🍎",
      content: [
        "4 Sehat 5 Sempurna",
        "Buah dan sayur berwarna-warni",
        "Bahaya junk food",
        "Manfaat sarapan sehat"
      ]
    },
    {
      title: "Aktivitas Fisik",
      description: "Pentingnya bergerak aktif untuk kesehatan",
      icon: "⚽",
      content: [
        "Olahraga yang menyenangkan",
        "Bermain di luar ruangan",
        "Manfaat berjalan kaki",
        "Peregangan sederhana"
      ]
    },
    {
      title: "Kesehatan Mental",
      description: "Menjaga perasaan dan emosi tetap sehat",
      icon: "😊",
      content: [
        "Mengelola emosi dengan baik",
        "Pentingnya berteman",
        "Berbagi cerita dengan orang tua",
        "Cara mengatasi stress"
      ]
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">
            Edukasi Kesehatan untuk Anak 📚
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Mari belajar tentang kesehatan dengan cara yang mudah dan menyenangkan!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {educationTopics.map((topic, index) => (
            <Card 
              key={index} 
              className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-gray-50 animate-float"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="text-center">
                <div className="text-5xl mb-4 animate-bounce-slow">
                  {topic.icon}
                </div>
                <CardTitle className="text-xl font-bold text-gray-800 mb-2">
                  {topic.title}
                </CardTitle>
                <p className="text-gray-600 text-sm">
                  {topic.description}
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {topic.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-sm text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Special Features */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-primary to-primary/80 text-white border-0">
            <CardHeader className="text-center">
              <BookOpen className="w-12 h-12 mx-auto mb-4 animate-wiggle" />
              <CardTitle className="text-xl font-bold">Materi Interaktif</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-4">Video, gambar, dan animasi menarik untuk belajar kesehatan</p>
              <Button variant="secondary" className="w-full">
                Lihat Materi
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary to-secondary/80 text-white border-0">
            <CardHeader className="text-center">
              <Users className="w-12 h-12 mx-auto mb-4 animate-wiggle" style={{ animationDelay: '0.2s' }} />
              <CardTitle className="text-xl font-bold">Belajar Bersama</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-4">Diskusi dan berbagi pengalaman dengan teman sekelas</p>
              <Button variant="secondary" className="w-full">
                Gabung Forum
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-success to-success/80 text-white border-0">
            <CardHeader className="text-center">
              <Shield className="w-12 h-12 mx-auto mb-4 animate-wiggle" style={{ animationDelay: '0.4s' }} />
              <CardTitle className="text-xl font-bold">Pantau Progress</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-4">Lihat kemajuan belajar dan pencapaian kesehatan</p>
              <Button variant="secondary" className="w-full">
                Cek Progress
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
