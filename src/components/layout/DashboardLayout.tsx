
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Menu, X, LogOut, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}

interface DashboardLayoutProps {
  title: string;
  menuItems: MenuItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  userRole: 'student' | 'teacher' | 'admin' | 'super-admin';
  children: React.ReactNode;
}

const DashboardLayout = ({ 
  title, 
  menuItems, 
  activeTab, 
  onTabChange, 
  userRole, 
  children 
}: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success('Berhasil keluar. Sampai jumpa! 👋');
    navigate('/');
  };

  const getRoleColor = () => {
    switch (userRole) {
      case 'student': return 'from-primary to-secondary';
      case 'teacher': return 'from-success to-secondary';
      case 'admin': return 'from-warning to-primary';
      case 'super-admin': return 'from-purple-500 to-primary';
      default: return 'from-primary to-secondary';
    }
  };

  const getRoleEmoji = () => {
    switch (userRole) {
      case 'student': return '👦';
      case 'teacher': return '👩‍🏫';
      case 'admin': return '👨‍💼';
      case 'super-admin': return '👑';
      default: return '👤';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu size={24} />
            </button>
            
            <Link to="/" className="flex items-center space-x-2">
              <div className={`w-10 h-10 bg-gradient-to-r ${getRoleColor()} rounded-full flex items-center justify-center`}>
                <Heart className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">SIASEH</h1>
                <p className="text-xs text-gray-600 -mt-1">Dashboard {userRole}</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-full">
              <span className="text-2xl">{getRoleEmoji()}</span>
              <span className="font-medium text-gray-700 capitalize">{userRole}</span>
            </div>
            
            <Link to="/">
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Home size={16} className="mr-2" />
                Beranda
              </Button>
            </Link>
            
            <Button onClick={handleLogout} variant="outline" size="sm" className="text-red-600 hover:text-red-700">
              <LogOut size={16} className="mr-2" />
              Keluar
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className={`p-6 bg-gradient-to-r ${getRoleColor()}`}>
              <div className="flex items-center justify-between text-white">
                <h2 className="text-xl font-bold">{title}</h2>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="lg:hidden p-1 rounded hover:bg-white/20"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 p-4">
              <ul className="space-y-2">
                {menuItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => {
                          onTabChange(item.id);
                          setIsSidebarOpen(false);
                        }}
                        className={`
                          w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200
                          ${activeTab === item.id
                            ? `bg-gradient-to-r ${getRoleColor()} text-white shadow-lg`
                            : 'text-gray-700 hover:bg-gray-100'
                          }
                        `}
                      >
                        <IconComponent size={20} />
                        <span>{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Sidebar Footer */}
            <div className="p-4 border-t">
              <div className="text-center text-sm text-gray-500">
                <p>SIASEH v1.0</p>
                <p>Sistem Informasi Anak Sehat</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
