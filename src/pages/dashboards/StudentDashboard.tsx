
import { useState } from 'react';
import { Heart, User, FileText, Gamepad2, Calendar, AlertCircle, Award, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import DashboardLayout from '@/components/layout/DashboardLayout';
import HealthForm from '@/components/student/HealthForm';
import ComplaintForm from '@/components/student/ComplaintForm';
import HealthSummary from '@/components/student/HealthSummary';
import StudentGames from '@/components/student/StudentGames';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const studentData = {
    name: "Andi Pratama",
    class: "5A",
    school: "SD Nusantara Jakarta",
    teacher: "Bu Sari Dewi",
    healthScore: 85,
    gamesCompleted: 12,
    totalGames: 20,
    achievements: [
      { name: "Rajin Cuci Tangan", icon: "🧼", earned: true },
      { name: "Makan Sayur Setiap Hari", icon: "🥬", earned: true },
      { name: "Tidur Tepat Waktu", icon: "😴", earned: false },
      { name: "Olahraga Rutin", icon: "⚽", earned: true }
    ]
  };

  const menuItems = [
    { id: 'overview', label: 'Beranda', icon: User },
    { id: 'health-data', label: 'Data Kesehatan', icon: Heart },
    { id: 'complaints', label: 'Keluhan', icon: AlertCircle },
    { id: 'summary', label: 'Rekap', icon: FileText },
    { id: 'games', label: 'Game Edukasi', icon: Gamepad2 }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Welcome Section */}
            <Card className="bg-gradient-to-r from-primary to-secondary text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold mb-2">
                      Halo, {studentData.name}! 👋
                    </h1>
                    <p className="text-white/90 mb-2">
                      Kelas {studentData.class} - {studentData.school}
                    </p>
                    <p className="text-white/80">
                      Guru Wali: {studentData.teacher}
                    </p>
                  </div>
                  <div className="text-6xl animate-bounce-slow">
                    😊
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Health Score */}
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

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="text-primary" />
                  <span>Aktivitas Hari Ini</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button
                    onClick={() => setActiveTab('health-data')}
                    className="h-20 bg-gradient-to-br from-kid-pink to-pink-400 hover:from-pink-400 hover:to-pink-500 text-white flex-col space-y-2"
                  >
                    <Heart size={24} />
                    <span>Input Kesehatan</span>
                  </Button>
                  <Button
                    onClick={() => setActiveTab('complaints')}
                    className="h-20 bg-gradient-to-br from-kid-orange to-orange-400 hover:from-orange-400 hover:to-orange-500 text-white flex-col space-y-2"
                  >
                    <AlertCircle size={24} />
                    <span>Lapor Keluhan</span>
                  </Button>
                  <Button
                    onClick={() => setActiveTab('games')}
                    className="h-20 bg-gradient-to-br from-kid-purple to-purple-400 hover:from-purple-400 hover:to-purple-500 text-white flex-col space-y-2"
                  >
                    <Gamepad2 size={24} />
                    <span>Main Game</span>
                  </Button>
                  <Button
                    onClick={() => setActiveTab('summary')}
                    className="h-20 bg-gradient-to-br from-kid-blue to-blue-400 hover:from-blue-400 hover:to-blue-500 text-white flex-col space-y-2"
                  >
                    <FileText size={24} />
                    <span>Lihat Rekap</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="text-warning" />
                  <span>Pencapaian Saya</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {studentData.achievements.map((achievement, index) => (
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
          </div>
        );

      case 'health-data':
        return <HealthForm />;
      case 'complaints':
        return <ComplaintForm />;
      case 'summary':
        return <HealthSummary />;
      case 'games':
        return <StudentGames />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout
      title="Dashboard Siswa"
      menuItems={menuItems}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      userRole="student"
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default StudentDashboard;
