
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { AlertCircle, Search, User, Calendar, MessageSquare } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Complaint {
  id: string;
  complaint: string;
  status: string;
  response: string;
  created_at: string;
  student: {
    name: string;
    class_name: string;
  };
}

const ComplaintsList = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [filteredComplaints, setFilteredComplaints] = useState<Complaint[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  useEffect(() => {
    const filtered = complaints.filter(complaint =>
      complaint.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.complaint.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredComplaints(filtered);
  }, [complaints, searchTerm]);

  const fetchComplaints = async () => {
    try {
      const { data, error } = await supabase
        .from('complaints')
        .select(`
          *,
          student:users!complaints_student_id_fkey(name, class_name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComplaints(data || []);
    } catch (error) {
      console.error('Error fetching complaints:', error);
      toast.error('Gagal memuat keluhan siswa');
    } finally {
      setLoading(false);
    }
  };

  const respondToComplaint = async (complaintId: string) => {
    if (!response.trim()) {
      toast.error('Mohon isi tanggapan terlebih dahulu');
      return;
    }

    try {
      const { error } = await supabase
        .from('complaints')
        .update({
          response: response.trim(),
          status: 'resolved',
          updated_at: new Date().toISOString(),
        })
        .eq('id', complaintId);

      if (error) throw error;
      
      toast.success('Tanggapan berhasil dikirim');
      setSelectedComplaint(null);
      setResponse('');
      fetchComplaints();
    } catch (error) {
      console.error('Error responding to complaint:', error);
      toast.error('Gagal mengirim tanggapan');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Menunggu';
      case 'in_progress': return 'Diproses';
      case 'resolved': return 'Selesai';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Memuat keluhan siswa...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary">Keluhan Siswa</h2>
          <p className="text-gray-600">Tanggapi keluhan dan masalah siswa</p>
        </div>
        <Badge className="bg-primary text-white">
          <AlertCircle className="mr-1" size={16} />
          {complaints.filter(c => c.status === 'pending').length} Perlu Ditanggapi
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search size={20} />
            <span>Cari Keluhan</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Cari berdasarkan nama siswa atau isi keluhan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {filteredComplaints.map((complaint) => (
          <Card key={complaint.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <User className="text-primary" size={20} />
                    <h3 className="font-semibold text-lg">{complaint.student.name}</h3>
                    {complaint.student.class_name && (
                      <Badge variant="outline">Kelas {complaint.student.class_name}</Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(complaint.status)}>
                      {getStatusText(complaint.status)}
                    </Badge>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Calendar size={14} />
                      <span>{new Date(complaint.created_at).toLocaleDateString('id-ID')}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Keluhan:</h4>
                  <p className="text-gray-700">{complaint.complaint}</p>
                </div>

                {complaint.response && (
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium mb-2 text-green-800">Tanggapan Guru:</h4>
                    <p className="text-green-700">{complaint.response}</p>
                  </div>
                )}

                {complaint.status === 'pending' && (
                  <div className="pt-4 border-t">
                    {selectedComplaint?.id === complaint.id ? (
                      <div className="space-y-3">
                        <Textarea
                          placeholder="Tulis tanggapan untuk keluhan ini..."
                          value={response}
                          onChange={(e) => setResponse(e.target.value)}
                          className="min-h-[100px]"
                        />
                        <div className="flex space-x-2">
                          <Button 
                            onClick={() => respondToComplaint(complaint.id)}
                            size="sm"
                          >
                            <MessageSquare className="mr-2" size={16} />
                            Kirim Tanggapan
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={() => {
                              setSelectedComplaint(null);
                              setResponse('');
                            }}
                            size="sm"
                          >
                            Batal
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button 
                        onClick={() => setSelectedComplaint(complaint)}
                        size="sm"
                        variant="outline"
                      >
                        <MessageSquare className="mr-2" size={16} />
                        Beri Tanggapan
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredComplaints.length === 0 && !loading && (
        <div className="text-center py-12">
          <AlertCircle className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-xl font-semibold mb-2">
            {searchTerm ? 'Keluhan Tidak Ditemukan' : 'Belum Ada Keluhan'}
          </h3>
          <p className="text-gray-600">
            {searchTerm 
              ? 'Coba ubah kata kunci pencarian' 
              : 'Keluhan siswa akan muncul di sini'}
          </p>
        </div>
      )}
    </div>
  );
};

export default ComplaintsList;
