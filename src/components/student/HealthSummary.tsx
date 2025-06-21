
import { Calendar, TrendingUp, Award, Heart, Activity, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const HealthSummary = () => {
  const weeklyData = [
    { day: 'Senin', score: 85, mood: '😊', sleep: 8, water: 6, exercise: 30 },
    { day: 'Selasa', score: 92, mood: '😄', sleep: 9, water: 8, exercise: 45 },
    { day: 'Rabu', score: 78, mood: '😐', sleep: 7, water: 5, exercise: 20 },
    { day: 'Kamis', score: 88, mood: '😊', sleep: 8, water: 7, exercise: 35 },
    { day: 'Jumat', score: 95, mood: '😄', sleep: 9, water: 8, exercise: 50 },
    { day: 'Sabtu', score: 80, mood: '😊', sleep: 10, water: 6, exercise: 60 },
    { day: 'Minggu', score: 87, mood: '😊', sleep: 9, water: 7, exercise: 40 }
  ];

  const monthlyStats = {
    avgScore: 86,
    totalDays: 30,
    perfectDays: 8,
    improvements: [
      { category: 'Tidur', improvement: '+12%', color: 'text-blue-600' },
      { category: 'Olahraga', improvement: '+25%', color: 'text-green-600' },
      { category: 'Minum Air', improvement: '+8%', color: 'text-cyan-600' },
      { category: 'Mood', improvement: '+15%', color: 'text-yellow-600' }
    ]
  };

  const achievements = [
    { name: 'Tidur Teratur', description: '7 hari berturut-turut tidur 8+ jam', icon: '😴', earned: true },
    { name: 'Rajin Olahraga', description: 'Olahraga setiap hari selama seminggu', icon: '🏃‍♂️', earned: true },
    { name: 'Minum Air Champion', description: 'Minum 8 gelas air per hari', icon: '💧', earned: false },
    { name: 'Happy Kid', description: 'Mood bahagia selama 5 hari berturut-turut', icon: '😄', earned: true }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreGrade = (score: number) => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    return 'D';
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-kid-blue to-blue-400 text-white border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-xl">
            <BarChart3 className="animate-bounce-slow" />
            <span>Rekap Kesehatan 📊</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/90">
            Lihat perkembangan kesehatanmu dan raih pencapaian terbaik! 🌟
          </p>
        </CardContent>
      </Card>

      {/* Monthly Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-kid-green to-green-400 text-white border-0">
          <CardContent className="p-6 text-center">
            <Heart className="mx-auto mb-2" size={32} />
            <div className="text-2xl font-bold mb-1">{monthlyStats.avgScore}</div>
            <p className="text-sm text-white/80">Rata-rata Skor</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-kid-purple to-purple-400 text-white border-0">
          <CardContent className="p-6 text-center">
            <Calendar className="mx-auto mb-2" size={32} />
            <div className="text-2xl font-bold mb-1">{monthlyStats.totalDays}</div>
            <p className="text-sm text-white/80">Hari Tercatat</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-kid-yellow to-yellow-400 text-white border-0">
          <CardContent className="p-6 text-center">
            <Award className="mx-auto mb-2" size={32} />
            <div className="text-2xl font-bold mb-1">{monthlyStats.perfectDays}</div>
            <p className="text-sm text-white/80">Hari Sempurna</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-kid-pink to-pink-400 text-white border-0">
          <CardContent className="p-6 text-center">
            <TrendingUp className="mx-auto mb-2" size={32} />
            <div className="text-2xl font-bold mb-1">A</div>
            <p className="text-sm text-white/80">Grade Bulan Ini</p>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="text-primary" />
            <span>Progress Minggu Ini</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyData.map((day, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-16 text-center">
                  <div className="font-semibold text-sm">{day.day}</div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge className={`${getScoreColor(day.score)} px-2 py-1`}>
                      {getScoreGrade(day.score)}
                    </Badge>
                    <span className="font-semibold">{day.score}/100</span>
                    <span className="text-2xl">{day.mood}</span>
                  </div>
                  <Progress value={day.score} className="h-2" />
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div>
                    <div className="font-semibold text-blue-600">{day.sleep}h</div>
                    <div className="text-gray-600">Tidur</div>
                  </div>
                  <div>
                    <div className="font-semibold text-cyan-600">{day.water} gelas</div>
                    <div className="text-gray-600">Air</div>
                  </div>
                  <div>
                    <div className="font-semibold text-green-600">{day.exercise}m</div>
                    <div className="text-gray-600">Olahraga</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Improvements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="text-primary" />
            <span>Perkembangan Bulan Ini</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {monthlyStats.improvements.map((item, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="font-semibold mb-1">{item.category}</div>
                <div className={`text-2xl font-bold ${item.color}`}>
                  {item.improvement}
                </div>
                <div className="text-sm text-gray-600">dari bulan lalu</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="text-primary" />
            <span>Pencapaian</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  achievement.earned
                    ? 'bg-gradient-to-r from-kid-green/20 to-green-100 border-green-300 animate-pulse-glow'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`text-3xl ${achievement.earned ? '' : 'grayscale'}`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${achievement.earned ? 'text-green-700' : 'text-gray-600'}`}>
                      {achievement.name}
                    </h4>
                    <p className={`text-sm ${achievement.earned ? 'text-green-600' : 'text-gray-500'}`}>
                      {achievement.description}
                    </p>
                  </div>
                  {achievement.earned && (
                    <Badge className="bg-green-500 text-white">
                      ✓ Selesai
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthSummary;
