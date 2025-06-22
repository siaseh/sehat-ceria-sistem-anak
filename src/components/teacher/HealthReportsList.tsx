
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Heart, Search, Calendar, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface HealthReport {
  id: string;
  height: number;
  weight: number;
  temperature: number;
  blood_pressure: string;
  notes: string;
  report_date: string;
  created_at: string;
  student: {
    name: string;
    class_name: string;
  };
}

const HealthReportsList = () => {
  const [reports, setReports] = useState<HealthReport[]>([]);
  const [filteredReports, setFilteredReports] = useState<HealthReport[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHealthReports();
  }, []);

  useEffect(() => {
    const filtered = reports.filter(report =>
      report.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.student.class_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredReports(filtered);
  }, [reports, searchTerm]);

  const fetchHealthReports = async () => {
    try {
      const { data, error } = await supabase
        .from('health_reports')
        .select(`
          *,
          student:users!health_reports_student_id_fkey(name, class_name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReports(data || []);
    } catch (error) {
      console.error('Error fetching health reports:', error);
      toast.error('Gagal memuat laporan kesehatan');
    } finally {
      setLoading(false);
    }
  };

  const getBMIStatus = (height: number, weight: number) => {
    if (!height || !weight) return { status: 'Unknown', color: 'bg-gray-100 text-gray-800' };
    
    const heightInM = height / 100;
    const bmi = weight / (heightInM * heightInM);
    
    if (bmi < 18.5) return { status: 'Kurus', color: 'bg-blue-100 text-blue-800' };
    if (bmi < 25) return { status: 'Normal', color: 'bg-green-100 text-green-800' };
    if (bmi < 30) return { status: 'Gemuk', color: 'bg-yellow-100 text-yellow-800' };
    return { status: 'Obesitas', color: 'bg-red-100 text-red-800' };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Memuat laporan kesehatan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary">Laporan Kesehatan</h2>
          <p className="text-gray-600">Pantau kondisi kesehatan siswa</p>
        </div>
        <Badge className="bg-primary text-white">
          <Heart className="mr-1" size={16} />
          {reports.length} Laporan
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search size={20} />
            <span>Cari Laporan</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Cari berdasarkan nama siswa atau kelas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {filteredReports.map((report) => {
          const bmiStatus = getBMIStatus(report.height, report.weight);
          
          return (
            <Card key={report.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <User className="text-primary" size={20} />
                      <h3 className="font-semibold text-lg">{report.student.name}</h3>
                      {report.student.class_name && (
                        <Badge variant="outline">Kelas {report.student.class_name}</Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Tinggi Badan:</span>
                        <p className="font-medium">{report.height || '-'} cm</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Berat Badan:</span>
                        <p className="font-medium">{report.weight || '-'} kg</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Suhu Tubuh:</span>
                        <p className="font-medium">{report.temperature || '-'}°C</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Tekanan Darah:</span>
                        <p className="font-medium">{report.blood_pressure || '-'}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Calendar className="text-primary" size={16} />
                        <span className="text-sm text-gray-600">
                          {new Date(report.report_date).toLocaleDateString('id-ID')}
                        </span>
                      </div>
                      <Badge className={bmiStatus.color}>
                        BMI: {bmiStatus.status}
                      </Badge>
                    </div>
                    
                    {report.notes && (
                      <div>
                        <span className="text-gray-500 text-sm">Catatan:</span>
                        <p className="text-sm mt-1 p-2 bg-gray-50 rounded">{report.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredReports.length === 0 && !loading && (
        <div className="text-center py-12">
          <Heart className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-xl font-semibold mb-2">
            {searchTerm ? 'Laporan Tidak Ditemukan' : 'Belum Ada Laporan Kesehatan'}
          </h3>
          <p className="text-gray-600">
            {searchTerm 
              ? 'Coba ubah kata kunci pencarian' 
              : 'Laporan kesehatan akan muncul di sini setelah siswa mengisi data'}
          </p>
        </div>
      )}
    </div>
  );
};

export default HealthReportsList;
