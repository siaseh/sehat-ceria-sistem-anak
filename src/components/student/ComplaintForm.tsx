
import { useState } from 'react';
import { AlertCircle, Send, FileText, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    category: '',
    severity: '',
    title: '',
    description: '',
    location: '',
    duration: ''
  });

  const [complaints] = useState([
    {
      id: 1,
      date: '2024-01-15',
      title: 'Sakit Perut',
      category: 'Pencernaan',
      severity: 'Sedang',
      status: 'Ditanggapi',
      response: 'Sudah diberikan obat dan istirahat. Kondisi membaik.'
    },
    {
      id: 2,
      date: '2024-01-12',
      title: 'Pusing setelah olahraga',
      category: 'Umum',
      severity: 'Ringan',
      status: 'Menunggu',
      response: null
    }
  ]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Complaint submitted:', formData);
    toast.success('Keluhan berhasil dikirim ke guru! 📨');
    
    // Reset form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      category: '',
      severity: '',
      title: '',
      description: '',
      location: '',
      duration: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ditanggapi': return 'bg-green-500';
      case 'Menunggu': return 'bg-yellow-500';
      case 'Sedang Ditinjau': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Ringan': return 'bg-green-500';
      case 'Sedang': return 'bg-yellow-500';
      case 'Berat': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-kid-orange to-orange-400 text-white border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-xl">
            <AlertCircle className="animate-pulse" />
            <span>Lapor Keluhan Kesehatan 🏥</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/90">
            Jika kamu merasa tidak enak badan atau ada keluhan, ceritakan kepada guru melalui form ini ya! 💬
          </p>
        </CardContent>
      </Card>

      {/* Form Keluhan Baru */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="text-primary" />
            <span>Keluhan Baru</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Tanggal</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="category">Kategori Keluhan</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="umum">🤒 Keluhan Umum</SelectItem>
                    <SelectItem value="pencernaan">🍽️ Pencernaan</SelectItem>
                    <SelectItem value="pernapasan">🫁 Pernapasan</SelectItem>
                    <SelectItem value="kulit">🧴 Kulit</SelectItem>
                    <SelectItem value="mata">👁️ Mata</SelectItem>
                    <SelectItem value="telinga">👂 Telinga</SelectItem>
                    <SelectItem value="lainnya">❓ Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="severity">Tingkat Keluhan</Label>
                <Select value={formData.severity} onValueChange={(value) => handleInputChange('severity', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Seberapa sakit?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ringan">😊 Ringan - Masih bisa beraktivitas</SelectItem>
                    <SelectItem value="sedang">😐 Sedang - Agak mengganggu</SelectItem>
                    <SelectItem value="berat">😰 Berat - Sangat mengganggu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="duration">Sudah berapa lama?</Label>
                <Select value={formData.duration} onValueChange={(value) => handleInputChange('duration', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Durasi keluhan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baru">Baru saja</SelectItem>
                    <SelectItem value="beberapa-jam">Beberapa jam</SelectItem>
                    <SelectItem value="1-hari">1 hari</SelectItem>
                    <SelectItem value="beberapa-hari">Beberapa hari</SelectItem>
                    <SelectItem value="lebih-lama">Lebih dari seminggu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="title">Judul Keluhan</Label>
              <Input
                id="title"
                placeholder="Contoh: Sakit kepala setelah olahraga"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="location">Di mana sakitnya?</Label>
              <Input
                id="location"
                placeholder="Contoh: Kepala bagian depan, perut kanan bawah"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="description">Ceritakan keluhanmu</Label>
              <Textarea
                id="description"
                placeholder="Ceritakan dengan detail apa yang kamu rasakan, kapan mulai sakit, apa yang membuatnya bertambah sakit atau membaik..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className="mt-1"
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-gradient-to-r from-kid-orange to-orange-400 hover:from-orange-400 hover:to-orange-500"
              >
                <Send className="mr-2" size={16} />
                Kirim Keluhan
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Riwayat Keluhan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="text-primary" />
            <span>Riwayat Keluhan</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {complaints.map((complaint) => (
              <Card key={complaint.id} className="border-l-4 border-l-primary">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-lg">{complaint.title}</h4>
                      <p className="text-sm text-gray-600">{complaint.date}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Badge className={`${getSeverityColor(complaint.severity)} text-white`}>
                        {complaint.severity}
                      </Badge>
                      <Badge className={`${getStatusColor(complaint.status)} text-white`}>
                        {complaint.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="outline">{complaint.category}</Badge>
                  </div>
                  {complaint.response && (
                    <div className="bg-green-50 border-l-4 border-l-green-400 p-3 mt-3">
                      <p className="text-sm font-medium text-green-800 mb-1">Tanggapan Guru:</p>
                      <p className="text-sm text-green-700">{complaint.response}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplaintForm;
