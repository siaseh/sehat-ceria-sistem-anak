
import { useState } from 'react';
import { Users, School, FileText, Settings, BarChart3, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardLayout from '@/components/layout/DashboardLayout';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const adminData = {
    name: "Pak Budi Santoso",
    school: "SD Nusantara Jakarta",
    totalTeachers: 15,
    totalStudents: 420,
    totalClasses: 18,
    healthReports: 156
  };

  const menuItems = [
    { id: 'overview', label: 'Beranda', icon: BarChart3 },
    { id: 'teachers', label: 'Kelola Guru', icon: Users },
    { id: 'students', label: 'Kelola Siswa', icon: School },
    { id: 'reports', label: 'Laporan', icon: FileText },
    { id: 'settings', label: 'Pengaturan', icon: Settings }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <Card className="bg-gradient-to-r from-warning to-primary text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold mb-2">
                      Selamat datang, {adminData.name}! 👨‍💼
                    </h1>
                    <p className="text-white/90 mb-2">
                      Admin - {adminData.school}
                    </p>
                    <p className="text-white/80">
                      Mengelola {adminData.totalTeachers} guru dan {adminData.totalStudents} siswa
                    </p>
                  </div>
                  <div className="text-6xl animate-bounce-slow">
                    🏫
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-kid-blue to-blue-400 text-white border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users />
                    <span>Total Guru</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{adminData.totalTeachers}</div>
                  <p className="text-sm text-white/80">Guru aktif</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-kid-green to-green-400 text-white border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <School />
                    <span>Total Siswa</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{adminData.totalStudents}</div>
                  <p className="text-sm text-white/80">Siswa aktif</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-kid-orange to-orange-400 text-white border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield />
                    <span>Total Kelas</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{adminData.totalClasses}</div>
                  <p className="text-sm text-white/80">Kelas aktif</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-kid-purple to-purple-400 text-white border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText />
                    <span>Laporan Kesehatan</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{adminData.healthReports}</div>
                  <p className="text-sm text-white/80">Laporan bulan ini</p>
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
      title="Dashboard Admin"
      menuItems={menuItems}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      userRole="admin"
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default AdminDashboard;
