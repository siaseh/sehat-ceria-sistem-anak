
import { Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AchievementsGridProps {
  achievements: Array<{
    name: string;
    icon: string;
    earned: boolean;
  }>;
}

const AchievementsGrid = ({ achievements }: AchievementsGridProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Award className="text-warning" />
          <span>Pencapaian Saya</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl text-center transition-all duration-300 ${
                achievement.earned
                  ? 'bg-gradient-to-br from-kid-green to-green-400 text-white animate-pulse-glow'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              <div className="text-3xl mb-2">{achievement.icon}</div>
              <p className="font-semibold text-sm">{achievement.name}</p>
              {achievement.earned && (
                <Badge className="mt-2 bg-white/20 text-white">
                  ✓ Selesai
                </Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementsGrid;
