
import { useState } from 'react';
import { Users, FileText, MessageSquare, Calendar, Award, Heart, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/layout/DashboardLayout';

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const teacherData = {
    name: "Bu Sari Dewi",
    class: "5A",
    school: "SD Nusantara Jakarta",
    totalStudents: 28,
    healthReports: 15,
    complaints: 3,
    achievements: 42
  };

  const menuItems = [
    { id: 'overview', label: 'Beranda', icon: Users },
    { id: 'students', label: 'Data Siswa', icon: Users },
    { id: 'health-reports', label: 'Laporan Kesehatan', icon: Heart },
    { id: 'complaints', label: 'Keluhan Siswa', icon: AlertCircle },
    { id: 'reports', label: 'Cetak Laporan', icon: FileText }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <Card className="bg-gradient-to-r from-success to-secondary text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold mb-2">
                      Selamat datang, {teacherData.name}! 👩‍🏫
                    </h1>
                    <p className="text-white/90 mb-2">
                      Wali Kelas {teacherData.class} - {teacherData.school}
                    </p>
                    <p className="text-white/80">
                      Mengelola {teacherData.totalStudents} siswa
                    </p>
                  </div>
                  <div className="text-6xl animate-bounce-slow">
                    📚
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-kid-blue to-blue-400 text-white border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users />
                    <span>Total Siswa</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{teacherData.totalStudents}</div>
                  <p className="text-sm text-white/80">Siswa aktif</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-kid-green to-green-400 text-white border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart />
                    <span>Laporan Kesehatan</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{teacherData.healthReports}</div>
                  <p className="text-sm text-white/80">Laporan hari ini</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-kid-orange to-orange-400 text-white border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertCircle />
                    <span>Keluhan</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{teacherData.complaints}</div>
                  <p className="text-sm text-white/80">Perlu ditanggapi</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-kid-purple to-purple-400 text-white border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award />
                    <span>Pencapaian</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{teacherData.achievements}</div>
                  <p className="text-sm text-white/80">Badge diraih siswa</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">Fitur Sedang Dikembangkan</h3>
            <p className="text-gray-600">Fitur ini akan segera tersedia!</p>
          </div>
        );
    }
  };

  return (
    <DashboardLayout
      title="Dashboard Guru"
      menuItems={menuItems}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      userRole="teacher"
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default TeacherDashboard;
