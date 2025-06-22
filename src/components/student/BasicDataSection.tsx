
import { Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BasicDataSectionProps {
  date: string;
  mood: string;
  onDateChange: (value: string) => void;
  onMoodChange: (value: string) => void;
}

const BasicDataSection = ({ date, mood, onDateChange, onMoodChange }: BasicDataSectionProps) => {
  return (
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
              value={date}
              onChange={(e) => onDateChange(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="mood">Mood Hari Ini</Label>
            <Select value={mood} onValueChange={onMoodChange}>
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
  );
};

export default BasicDataSection;
