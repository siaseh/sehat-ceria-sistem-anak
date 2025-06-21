
import { useState } from 'react';
import { Heart, Thermometer, Scale, Activity, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const HealthForm = () => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    height: '',
    weight: '',
    temperature: '',
    bloodPressure: '',
    mood: '',
    sleepHours: '',
    waterIntake: '',
    exercise: '',
    notes: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Health data submitted:', formData);
    toast.success('Data kesehatan berhasil disimpan! 📊');
    
    // Reset form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      height: '',
      weight: '',
      temperature: '',
      bloodPressure: '',
      mood: '',
      sleepHours: '',
      waterIntake: '',
      exercise: '',
      notes: ''
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-kid-green to-green-400 text-white border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-xl">
            <Heart className="animate-pulse" />
            <span>Input Data Kesehatan Harian 📋</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/90">
            Isi data kesehatanmu setiap hari agar guru dan orang tua bisa memantau kesehatanmu! 😊
          </p>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="text-primary" />
              <span>Data Dasar</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
                <Label htmlFor="mood">Mood Hari Ini</Label>
                <Select value={formData.mood} onValueChange={(value) => handleInputChange('mood', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih mood kamu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sangat-bahagia">😄 Sangat Bahagia</SelectItem>
                    <SelectItem value="bahagia">😊 Bahagia</SelectItem>
                    <SelectItem value="biasa">😐 Biasa Saja</SelectItem>
                    <SelectItem value="sedih">😢 Sedih</SelectItem>
                    <SelectItem value="sakit">😷 Tidak Enak Badan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Scale className="text-primary" />
              <span>Pengukuran Fisik</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="height">Tinggi Badan (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="contoh: 125"
                  value={formData.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="weight">Berat Badan (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="contoh: 30"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="temperature">Suhu Tubuh (°C)</Label>
                <Input
                  id="temperature"
                  type="number"
                  step="0.1"
                  placeholder="contoh: 36.5"
                  value={formData.temperature}
                  onChange={(e) => handleInputChange('temperature', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="bloodPressure">Tekanan Darah (opsional)</Label>
                <Input
                  id="bloodPressure"
                  placeholder="contoh: 120/80"
                  value={formData.bloodPressure}
                  onChange={(e) => handleInputChange('bloodPressure', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="text-primary" />
              <span>Aktivitas Harian</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="sleepHours">Jam Tidur (jam)</Label>
                <Input
                  id="sleepHours"
                  type="number"
                  placeholder="contoh: 8"
                  value={formData.sleepHours}
                  onChange={(e) => handleInputChange('sleepHours', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="waterIntake">Minum Air (gelas)</Label>
                <Input
                  id="waterIntake"
                  type="number"
                  placeholder="contoh: 6"
                  value={formData.waterIntake}
                  onChange={(e) => handleInputChange('waterIntake', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="exercise">Olahraga (menit)</Label>
                <Input
                  id="exercise"
                  type="number"
                  placeholder="contoh: 30"
                  value={formData.exercise}
                  onChange={(e) => handleInputChange('exercise', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Catatan Tambahan</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Ceritakan tentang kesehatanmu hari ini, makanan yang dimakan, atau hal lain yang ingin disampaikan..."
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={4}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setFormData({
                date: new Date().toISOString().split('T')[0],
                height: '',
                weight: '',
                temperature: '',
                bloodPressure: '',
                mood: '',
                sleepHours: '',
                waterIntake: '',
                exercise: '',
                notes: ''
              });
            }}
          >
            Reset Form
          </Button>
          <Button
            type="submit"
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
          >
            <Heart className="mr-2" size={16} />
            Simpan Data Kesehatan
          </Button>
        </div>
      </form>
    </div>
  );
};

export default HealthForm;
