
import { useState } from 'react';
import { Heart, User, FileText, Gamepad2, AlertCircle } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StudentOverview from '@/components/student/StudentOverview';
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
        return <StudentOverview studentData={studentData} onTabChange={setActiveTab} />;
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
