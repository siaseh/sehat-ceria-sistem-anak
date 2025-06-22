
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Lock, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: ''
  });
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password || (!isLogin && !formData.role)) {
      toast.error('Mohon lengkapi semua data!');
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          toast.error(error.message || 'Login gagal');
          return;
        }
        toast.success('Login berhasil! 🎉');
      } else {
        const { error } = await signUp(formData.email, formData.password, {
          name: formData.email.split('@')[0],
          role: formData.role,
        });
        if (error) {
          toast.error(error.message || 'Registrasi gagal');
          return;
        }
        toast.success('Registrasi berhasil! Silakan cek email untuk verifikasi.');
      }

      // Redirect berdasarkan role
      switch (formData.role) {
        case 'student':
          navigate('/student');
          break;
        case 'teacher':
          navigate('/teacher');
          break;
        case 'admin':
          navigate('/admin');
          break;
        case 'super_admin':
          navigate('/super-admin');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast.error('Terjadi kesalahan sistem');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-kid-blue via-white to-kid-pink flex items-center justify-center p-4">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-kid-yellow/30 rounded-full animate-bounce-slow"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-kid-green/30 rounded-full animate-float"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-kid-pink/30 rounded-full animate-wiggle"></div>
        <div className="absolute bottom-40 right-10 w-18 h-18 bg-kid-purple/30 rounded-full animate-bounce-slow"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 group mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center group-hover:animate-wiggle">
              <Heart className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-primary">SIASEH</h1>
              <p className="text-sm text-gray-600">Sistem Informasi Anak Sehat</p>
            </div>
          </Link>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {isLogin ? 'Selamat Datang! 👋' : 'Daftar Akun Baru 📝'}
          </h2>
          <p className="text-gray-600">
            {isLogin ? 'Masuk ke akun SIASEH untuk mulai belajar kesehatan' : 'Buat akun baru untuk bergabung dengan SIASEH'}
          </p>
        </div>

        {/* Login/Register Form */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-bold text-gray-800">
              {isLogin ? 'Masuk ke Akun' : 'Daftar Akun Baru'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Daftar Sebagai
                  </label>
                  <Select 
                    value={formData.role} 
                    onValueChange={(value) => setFormData({...formData, role: value})}
                  >
                    <SelectTrigger className="w-full h-12 text-base">
                      <SelectValue placeholder="Pilih peran Anda" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">👦</span>
                          <span>Siswa</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="teacher">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">👩‍🏫</span>
                          <span>Guru</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="admin">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">👨‍💼</span>
                          <span>Admin Sekolah</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="super_admin">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">👑</span>
                          <span>Super Admin</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    type="email"
                    placeholder="Masukkan email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="pl-10 h-12 text-base"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Kata Sandi
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan kata sandi"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="pl-10 pr-10 h-12 text-base"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-white rounded-xl"
              >
                {loading ? 'Memproses...' : (isLogin ? 'Masuk ke SIASEH 🚀' : 'Daftar ke SIASEH 🎉')}
              </Button>
            </form>

            {/* Toggle Login/Register */}
            <div className="text-center mt-6">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                {isLogin ? 'Belum punya akun? Daftar di sini' : 'Sudah punya akun? Masuk di sini'}
              </button>
            </div>

            {/* Demo Accounts */}
            {isLogin && (
              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Akun Demo:</h3>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white p-2 rounded">
                    <p className="font-medium">Siswa</p>
                    <p>student@demo.com / password</p>
                  </div>
                  <div className="bg-white p-2 rounded">
                    <p className="font-medium">Guru</p>
                    <p>teacher@demo.com / password</p>
                  </div>
                  <div className="bg-white p-2 rounded">
                    <p className="font-medium">Admin</p>
                    <p>admin@demo.com / password</p>
                  </div>
                  <div className="bg-white p-2 rounded">
                    <p className="font-medium">Super Admin</p>
                    <p>super@demo.com / password</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link 
            to="/" 
            className="text-primary hover:text-primary/80 font-medium transition-colors"
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
