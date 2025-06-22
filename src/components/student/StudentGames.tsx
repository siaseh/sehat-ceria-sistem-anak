
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Trophy, Star, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Game {
  id: string;
  title: string;
  description: string;
  content: any;
  category: string;
  difficulty_level: string;
}

interface GameProgress {
  id: string;
  score: number;
  completed: boolean;
  completed_at: string;
}

const StudentGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [gameProgress, setGameProgress] = useState<Record<string, GameProgress>>({});
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGames();
    fetchGameProgress();
  }, []);

  const fetchGames = async () => {
    try {
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGames(data || []);
    } catch (error) {
      console.error('Error fetching games:', error);
      toast.error('Gagal memuat game');
    } finally {
      setLoading(false);
    }
  };

  const fetchGameProgress = async () => {
    try {
      const { data: userData } = await supabase
        .from('users')
        .select('id')
        .eq('auth_id', (await supabase.auth.getUser()).data.user?.id)
        .single();

      if (userData) {
        const { data, error } = await supabase
          .from('game_progress')
          .select('*')
          .eq('user_id', userData.id);

        if (error) throw error;
        
        const progressMap = (data || []).reduce((acc, progress) => {
          acc[progress.game_id] = progress;
          return acc;
        }, {});
        
        setGameProgress(progressMap);
      }
    } catch (error) {
      console.error('Error fetching game progress:', error);
    }
  };

  const playGame = (game: Game) => {
    setSelectedGame(game);
  };

  const completeGame = async (gameId: string, score: number) => {
    try {
      const { data: userData } = await supabase
        .from('users')
        .select('id')
        .eq('auth_id', (await supabase.auth.getUser()).data.user?.id)
        .single();

      if (userData) {
        const { error } = await supabase
          .from('game_progress')
          .upsert({
            user_id: userData.id,
            game_id: gameId,
            score,
            completed: true,
            completed_at: new Date().toISOString(),
          });

        if (error) throw error;
        
        toast.success('Selamat! Game berhasil diselesaikan! 🎉');
        fetchGameProgress();
        setSelectedGame(null);
      }
    } catch (error) {
      console.error('Error completing game:', error);
      toast.error('Gagal menyimpan progress game');
    }
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (selectedGame) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-primary">{selectedGame.title}</h2>
          <Button variant="outline" onClick={() => setSelectedGame(null)}>
            Kembali ke Daftar Game
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Play className="text-primary" />
              <span>Bermain: {selectedGame.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>{selectedGame.description}</p>
            
            {selectedGame.category === 'hygiene' && (
              <div className="space-y-4">
                <h3 className="font-semibold">Langkah-langkah Cuci Tangan:</h3>
                <div className="grid gap-2">
                  {selectedGame.content?.steps?.map((step: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-kid-blue/10 rounded">
                      <span className="font-bold text-kid-blue">{index + 1}.</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
                <Button 
                  onClick={() => completeGame(selectedGame.id, 100)}
                  className="w-full bg-kid-green hover:bg-kid-green/90"
                >
                  Selesai! Saya Sudah Mengerti 🎉
                </Button>
              </div>
            )}

            {selectedGame.category === 'nutrition' && (
              <div className="space-y-4">
                <h3 className="font-semibold">Kuis Makanan Sehat:</h3>
                {selectedGame.content?.questions?.map((q: any, index: number) => (
                  <div key={index} className="space-y-2">
                    <p className="font-medium">{q.question}</p>
                    <div className="grid gap-2">
                      {q.options.map((option: string, optIndex: number) => (
                        <Button
                          key={optIndex}
                          variant="outline"
                          onClick={() => {
                            if (optIndex === q.answer) {
                              toast.success('Benar! 🎉');
                              completeGame(selectedGame.id, 100);
                            } else {
                              toast.error('Coba lagi! 😊');
                            }
                          }}
                          className="justify-start"
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedGame.category === 'lifestyle' && (
              <div className="space-y-4">
                <div className="p-4 bg-kid-purple/10 rounded-lg">
                  <p className="text-lg">{selectedGame.content?.content}</p>
                </div>
                <Button 
                  onClick={() => completeGame(selectedGame.id, 100)}
                  className="w-full bg-kid-purple hover:bg-kid-purple/90"
                >
                  Mengerti! Saya Akan Tidur Cukup 🌙
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Memuat game...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-primary mb-2">Game Edukasi Kesehatan 🎮</h2>
        <p className="text-gray-600">Belajar kesehatan sambil bermain!</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => {
          const progress = gameProgress[game.id];
          const isCompleted = progress?.completed || false;
          
          return (
            <Card key={game.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{game.title}</CardTitle>
                  {isCompleted && (
                    <CheckCircle className="text-green-500" size={20} />
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getDifficultyColor(game.difficulty_level)}>
                    {game.difficulty_level}
                  </Badge>
                  <Badge variant="outline">{game.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">{game.description}</p>
                
                {isCompleted && (
                  <div className="flex items-center space-x-2 text-green-600">
                    <Trophy size={16} />
                    <span className="text-sm font-medium">
                      Diselesaikan dengan skor {progress.score}
                    </span>
                  </div>
                )}

                <Button 
                  onClick={() => playGame(game)}
                  className="w-full"
                  variant={isCompleted ? "outline" : "default"}
                >
                  <Play className="mr-2" size={16} />
                  {isCompleted ? 'Main Lagi' : 'Mulai Main'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {games.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎮</div>
          <h3 className="text-xl font-semibold mb-2">Belum Ada Game</h3>
          <p className="text-gray-600">Game edukasi akan segera tersedia!</p>
        </div>
      )}
    </div>
  );
};

export default StudentGames;
