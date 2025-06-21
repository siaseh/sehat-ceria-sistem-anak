
import { useState } from 'react';
import { Building2, Users, Shield, Settings, BarChart3, Database } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardLayout from '@/components/layout/DashboardLayout';

const SuperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const superAdminData = {
    name: "Super Admin",
    totalSchools: 25,
    totalAdmins: 25,
    totalTeachers: 375,
    totalStudents: 10500
  };

  const menuItems = [
    { id: 'overview', label: 'Beranda', icon: BarChart3 },
    { id: 'schools', label: 'Kelola Sekolah', icon: Building2 },
    { id: 'admins', label: 'Kelola Admin', icon: Shield },
    { id: 'system', label: 'Sistem', icon: Database },
    { id: 'settings', label: 'Pengaturan', icon: Settings }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <Card className="bg-gradient-to-r from-purple-500 to-primary text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold mb-2">
                      Selamat datang, {superAdminData.name}! 👑
                    </h1>
                    <p className="text-white/90 mb-2">
                      Super Administrator SIASEH
                    </p>
                    <p className="text-white/80">
                      Mengelola {superAdminData.totalSchools} sekolah di seluruh sistem
                    </p>
                  </div>
                  <div className="text-6xl animate-bounce-slow">
                    🌟
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-kid-blue to-blue-400 text-white border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building2 />
                    <span>Total Sekolah</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{superAdminData.totalSchools}</div>
                  <p className="text-sm text-white/80">Sekolah terdaftar</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-kid-green to-green-400 text-white border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield />
                    <span>Total Admin</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{superAdminData.totalAdmins}</div>
                  <p className="text-sm text-white/80">Admin sekolah</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-kid-orange to-orange-400 text-white border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users />
                    <span>Total Guru</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{superAdminData.totalTeachers}</div>
                  <p className="text-sm text-white/80">Guru di sistem</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-kid-purple to-purple-400 text-white border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users />
                    <span>Total Siswa</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{superAdminData.totalStudents.toLocaleString()}</div>
                  <p className="text-sm text-white/80">Siswa di sistem</p>
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
      title="Dashboard Super Admin"
      menuItems={menuItems}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      userRole="super-admin"
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default SuperAdminDashboard;
