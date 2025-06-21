
import { Heart, Gamepad2, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface HealthScoreCardsProps {
  studentData: {
    healthScore: number;
    gamesCompleted: number;
    totalGames: number;
    achievements: Array<{
      name: string;
      icon: string;
      earned: boolean;
    }>;
  };
}

const HealthScoreCards = ({ studentData }: HealthScoreCardsProps) => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="bg-gradient-to-br from-kid-green to-green-400 text-white border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="animate-pulse" />
            <span>Skor Kesehatan</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold mb-2">{studentData.healthScore}/100</div>
          <Progress value={studentData.healthScore} className="h-2 mb-2" />
          <p className="text-sm text-white/80">Bagus! Pertahankan ya! 🌟</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-kid-blue to-blue-400 text-white border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Gamepad2 className="animate-wiggle" />
            <span>Game Selesai</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold mb-2">
            {studentData.gamesCompleted}/{studentData.totalGames}
          </div>
          <Progress value={(studentData.gamesCompleted / studentData.totalGames) * 100} className="h-2 mb-2" />
          <p className="text-sm text-white/80">Ayo main game lagi! 🎮</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-kid-yellow to-yellow-400 text-white border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="animate-float" />
            <span>Pencapaian</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold mb-2">
            {studentData.achievements.filter(a => a.earned).length}/4
          </div>
          <div className="flex space-x-1 mb-2">
            {studentData.achievements.map((achievement, index) => (
              <span key={index} className={`text-2xl ${achievement.earned ? 'opacity-100' : 'opacity-50'}`}>
                {achievement.icon}
              </span>
            ))}
          </div>
          <p className="text-sm text-white/80">Keren banget! 🏆</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthScoreCards;
