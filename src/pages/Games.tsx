
import { Gamepad2, Star, Trophy, Target, Puzzle, Brain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Games = () => {
  const games = [
    {
      id: 1,
      title: "Cuci Tangan Challenge",
      description: "Belajar langkah-langkah mencuci tangan yang benar dengan permainan seru!",
      icon: <Target className="text-kid-blue" size={32} />,
      difficulty: "Mudah",
      points: 100,
      color: "from-kid-blue to-blue-400",
      category: "Kebersihan"
    },
    {
      id: 2,
      title: "Nutrisi Hunter",
      description: "Kumpulkan makanan bergizi dan hindari junk food dalam petualangan seru!",
      icon: <Puzzle className="text-kid-green" size={32} />,
      difficulty: "Sedang",
      points: 150,
      color: "from-kid-green to-green-400",
      category: "Nutrisi"
    },
    {
      id: 3,
      title: "Exercise Master",
      description: "Ikuti gerakan olahraga dan jadilah master olahraga yang hebat!",
      icon: <Brain className="text-kid-orange" size={32} />,
      difficulty: "Mudah",
      points: 120,
      color: "from-kid-orange to-orange-400",
      category: "Olahraga"
    },
    {
      id: 4,
      title: "Sleep Time Quest",
      description: "Pelajari pentingnya tidur cukup melalui petualangan mimpi yang menyenangkan!",
      icon: <Star className="text-kid-purple" size={32} />,
      difficulty: "Mudah",
      points: 90,
      color: "from-kid-purple to-purple-400",
      category: "Istirahat"
    },
    {
      id: 5,
      title: "Body Parts Quiz",
      description: "Kenali bagian-bagian tubuh dan fungsinya dengan kuis interaktif!",
      icon: <Trophy className="text-kid-pink" size={32} />,
      difficulty: "Sedang",
      points: 180,
      color: "from-kid-pink to-pink-400",
      category: "Anatomi"
    },
    {
      id: 6,
      title: "Health Hero Adventure",
      description: "Jadilah pahlawan kesehatan dan selamatkan dunia dari virus jahat!",
      icon: <Gamepad2 className="text-kid-yellow" size={32} />,
      difficulty: "Sulit",
      points: 250,
      color: "from-kid-yellow to-yellow-400",
      category: "Petualangan"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Mudah': return 'bg-green-500';
      case 'Sedang': return 'bg-yellow-500';
      case 'Sulit': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const handlePlayGame = (gameId: number) => {
    console.log(`Starting game with ID: ${gameId}`);
    // Placeholder untuk logika game
    alert('Game akan segera dimulai! 🎮');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-kid-purple/20 to-kid-blue/20">
      <Header />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center animate-wiggle">
                <Gamepad2 className="text-white" size={40} />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-primary mb-4">
              Game Edukasi Kesehatan 🎮
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Belajar kesehatan sambil bermain! Kumpulkan poin dan jadilah juara kesehatan!
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="bg-gradient-to-r from-kid-green to-green-400 text-white border-0">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold mb-2">6</div>
                <p className="text-white/90">Game Tersedia</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-kid-blue to-blue-400 text-white border-0">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold mb-2">1,290</div>
                <p className="text-white/90">Total Poin</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-kid-orange to-orange-400 text-white border-0">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold mb-2">15</div>
                <p className="text-white/90">Badge Diraih</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-kid-purple to-purple-400 text-white border-0">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold mb-2">3</div>
                <p className="text-white/90">Level Selesai</p>
              </CardContent>
            </Card>
          </div>

          {/* Games Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map((game) => (
              <Card key={game.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                <CardHeader className={`bg-gradient-to-r ${game.color} text-white relative`}>
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="bg-white/20 text-white">
                      {game.category}
                    </Badge>
                    <Badge className={`${getDifficultyColor(game.difficulty)} text-white`}>
                      {game.difficulty}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/20 p-3 rounded-full">
                      {game.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-2">{game.title}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Star size={16} className="text-yellow-300" />
                        <span className="text-white/90">{game.points} poin</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {game.description}
                  </p>
                  <Button 
                    onClick={() => handlePlayGame(game.id)}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <Gamepad2 className="mr-2" size={20} />
                    Main Sekarang!
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Coming Soon Section */}
          <div className="mt-16">
            <Card className="bg-gradient-to-r from-kid-yellow to-yellow-400 text-white overflow-hidden">
              <CardContent className="p-8 text-center relative">
                <div className="absolute top-4 right-4 text-6xl opacity-20">🚀</div>
                <h3 className="text-2xl font-bold mb-4">
                  Segera Hadir! 🌟
                </h3>
                <p className="text-lg mb-6">
                  Game-game seru lainnya sedang dalam pengembangan. Nantikan kejutan menarik dari kami!
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white/20 rounded-lg p-4">
                    <div className="text-2xl mb-2">🦷</div>
                    <p className="font-semibold">Dental Care Game</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <div className="text-2xl mb-2">👁️</div>
                    <p className="font-semibold">Eye Health Challenge</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <div className="text-2xl mb-2">🧠</div>
                    <p className="font-semibold">Mental Health Quest</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Games;
