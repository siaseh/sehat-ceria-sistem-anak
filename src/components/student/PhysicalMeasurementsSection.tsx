
import { Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PhysicalMeasurementsSectionProps {
  height: string;
  weight: string;
  temperature: string;
  bloodPressure: string;
  onHeightChange: (value: string) => void;
  onWeightChange: (value: string) => void;
  onTemperatureChange: (value: string) => void;
  onBloodPressureChange: (value: string) => void;
}

const PhysicalMeasurementsSection = ({
  height,
  weight,
  temperature,
  bloodPressure,
  onHeightChange,
  onWeightChange,
  onTemperatureChange,
  onBloodPressureChange
}: PhysicalMeasurementsSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="text-primary" />
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
              placeholder="contoh: 130"
              value={height}
              onChange={(e) => onHeightChange(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="weight">Berat Badan (kg)</Label>
            <Input
              id="weight"
              type="number"
              placeholder="contoh: 30"
              value={weight}
              onChange={(e) => onWeightChange(e.target.value)}
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
              value={temperature}
              onChange={(e) => onTemperatureChange(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="bloodPressure">Tekanan Darah</Label>
            <Input
              id="bloodPressure"
              placeholder="contoh: 120/80"
              value={bloodPressure}
              onChange={(e) => onBloodPressureChange(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhysicalMeasurementsSection;
