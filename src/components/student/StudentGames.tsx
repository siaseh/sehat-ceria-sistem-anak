
import { useState } from 'react';
import { Gamepad2, Star, Trophy, Play, Lock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

const StudentGames = () => {
  const [activeGame, setActiveGame] = useState<number | null>(null);

  const games = [
    {
      id: 1,
      title: "Cuci Tangan Master",
      description: "Pelajari 6 langkah cuci tangan yang benar!",
      icon: "🧼",
      difficulty: "Mudah",
      points: 100,
      completed: true,
      locked: false,
      progress: 100,
      stars: 3,
      color: "from-kid-blue to-blue-400"
    },
    {
      id: 2,
      title: "Makanan Sehat vs Junk Food",
      description: "Pilih makanan yang sehat untuk tubuh!",
      icon: "🥗",
      difficulty: "Mudah",
      points: 120,
      completed: true,
      locked: false,
      progress: 100,
      stars: 2,
      color: "from-kid-green to-green-400"
    },
    {
      id: 3,
      title: "Detektif Gigi Sehat",
      description: "Temukan cara merawat gigi yang benar!",
      icon: "🦷",
      difficulty: "Sedang",
      points: 150,
      completed: false,
      locked: false,
      progress: 60,
      stars: 0,
      color: "from-kid-yellow to-yellow-400"
    },
    {
      id: 4,
      title: "Olahraga Adventure",
      description: "Petualangan seru dengan berbagai olahraga!",
      icon: "🏃‍♂️",
      difficulty: "Sedang",
      points: 180,
      completed: false,
      locked: false,
      progress: 20,
      stars: 0,
      color: "from-kid-orange to-orange-400"
    },
    {
      id: 5,
      title: "Sleep Time Hero",
      description: "Bantu karakter tidur dengan baik!",
      icon: "😴",
      difficulty: "Mudah",
      points: 110,
      completed: false,
      locked: true,
      progress: 0,
      stars: 0,
      color: "from-kid-purple to-purple-400"
    },
    {
      id: 6,
      title: "Body Guard Challenge",
      description: "Lindungi tubuh dari kuman dan virus!",
      icon: "🛡️",
      difficulty: "Sulit",
      points: 250,
      completed: false,
      locked: true,
      progress: 0,
      stars: 0,
      color: "from-kid-pink to-pink-400"
    }
  ];

  const playerStats = {
    totalPoints: 520,
    gamesCompleted: 2,
    totalGames: games.length,
    averageStars: 2.5,
    achievements: [
      { name: "First Game", description: "Menyelesaikan game pertama", icon: "🎮" },
      { name: "Hygiene Master", description: "Menguasai semua game kebersihan", icon: "🧼" },
      { name: "Nutrition Expert", description: "Skor sempurna di game nutrisi", icon: "🥗" }
    ]
  };

  const handlePlayGame = (gameId: number) => {
    const game = games.find(g => g.id === gameId);
    if (game?.locked) {
      toast.error('Game ini masih terkunci! Selesaikan game sebelumnya dulu ya! 🔒');
      return;
    }
    
    setActiveGame(gameId);
    toast.success(`Memulai ${game?.title}! 🎮`);
    
    // Simulate game completion after 3 seconds
    setTimeout(() => {
      setActiveGame(null);
      toast.success('Game selesai! Kamu mendapat poin! ⭐');
    }, 3000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Mudah': return 'bg-green-500';
      case 'Sedang': return 'bg-yellow-500';
      case 'Sulit': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const renderStars = (count: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3].map((star) => (
          <Star
            key={star}
            size={16}
            className={star <= count ? 'text-yellow-400 fill-current' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  if (activeGame) {
    const game = games.find(g => g.id === activeGame);
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <div className="text-6xl mb-4 animate-bounce-slow">{game?.icon}</div>
            <h3 className="text-2xl font-bold mb-2">{game?.title}</h3>
            <p className="text-gray-600 mb-6">Sedang memuat game...</p>
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-kid-purple to-purple-400 text-white border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-xl">
            <Gamepad2 className="animate-wiggle" />
            <span>Game Edukasi Kesehatan 🎮</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/90">
            Bermain sambil belajar tentang kesehatan! Kumpulkan poin dan bintang untuk membuka game baru! ⭐
          </p>
        </CardContent>
      </Card>

      {/* Player Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-kid-green to-green-400 text-white border-0">
          <CardContent className="p-4 text-center">
            <Trophy className="mx-auto mb-2" size={24} />
            <div className="text-2xl font-bold">{playerStats.totalPoints}</div>
            <p className="text-sm text-white/80">Total Poin</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-kid-blue to-blue-400 text-white border-0">
          <CardContent className="p-4 text-center">
            <CheckCircle className="mx-auto mb-2" size={24} />
            <div className="text-2xl font-bold">{playerStats.gamesCompleted}/{playerStats.totalGames}</div>
            <p className="text-sm text-white/80">Game Selesai</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-kid-yellow to-yellow-400 text-white border-0">
          <CardContent className="p-4 text-center">
            <Star className="mx-auto mb-2" size={24} />
            <div className="text-2xl font-bold">{playerStats.averageStars.toFixed(1)}</div>
            <p className="text-sm text-white/80">Rata-rata Bintang</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-kid-pink to-pink-400 text-white border-0">
          <CardContent className="p-4 text-center">
            <Trophy className="mx-auto mb-2" size={24} />
            <div className="text-2xl font-bold">{playerStats.achievements.length}</div>
            <p className="text-sm text-white/80">Pencapaian</p>
          </CardContent>
        </Card>
      </div>

      {/* Games Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <Card key={game.id} className={`group transition-all duration-300 ${game.locked ? 'opacity-60' : 'hover:shadow-xl hover:-translate-y-1'}`}>
            <CardHeader className={`bg-gradient-to-r ${game.color} text-white relative`}>
              {game.locked && (
                <div className="absolute top-2 right-2">
                  <Lock className="text-white/80" size={20} />
                </div>
              )}
              
              <div className="flex items-center justify-between mb-2">
                <Badge className={`${getDifficultyColor(game.difficulty)} text-white`}>
                  {game.difficulty}
                </Badge>
                {game.completed && (
                  <Badge className="bg-white/20 text-white">
                    ✓ Selesai
                  </Badge>
                )}
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-2 filter">{game.icon}</div>
                <CardTitle className="text-lg mb-1">{game.title}</CardTitle>
                <div className="flex items-center justify-center space-x-2">
                  <Star size={14} className="text-yellow-300" />
                  <span className="text-sm">{game.points} poin</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-4">
              <p className="text-gray-600 text-sm mb-4">{game.description}</p>
              
              {/* Progress Bar */}
              {game.progress > 0 && (
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-600">Progress</span>
                    <span className="text-xs text-gray-600">{game.progress}%</span>
                  </div>
                  <Progress value={game.progress} className="h-2" />
                </div>
              )}
              
              {/* Stars */}
              <div className="flex items-center justify-between mb-4">
                {renderStars(game.stars)}
                <span className="text-xs text-gray-600">{game.stars}/3 ⭐</span>
              </div>
              
              <Button 
                onClick={() => handlePlayGame(game.id)}
                disabled={game.locked}
                className={`w-full ${game.locked 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90'
                } text-white font-semibold py-2 rounded-lg transition-all duration-300`}
              >
                {game.locked ? (
                  <>
                    <Lock className="mr-2" size={16} />
                    Terkunci
                  </>
                ) : (
                  <>
                    <Play className="mr-2" size={16} />
                    {game.completed ? 'Main Lagi' : 'Mulai Game'}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="text-primary" />
            <span>Pencapaian Terbaru</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {playerStats.achievements.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-kid-green/20 to-green-100 rounded-lg">
                <div className="text-2xl">{achievement.icon}</div>
                <div>
                  <h4 className="font-semibold text-green-700">{achievement.name}</h4>
                  <p className="text-sm text-green-600">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentGames;
