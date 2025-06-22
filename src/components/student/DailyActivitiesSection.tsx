
import { Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface DailyActivitiesSectionProps {
  sleepHours: string;
  waterIntake: string;
  exercise: string;
  onSleepHoursChange: (value: string) => void;
  onWaterIntakeChange: (value: string) => void;
  onExerciseChange: (value: string) => void;
}

const DailyActivitiesSection = ({
  sleepHours,
  waterIntake,
  exercise,
  onSleepHoursChange,
  onWaterIntakeChange,
  onExerciseChange
}: DailyActivitiesSectionProps) => {
  return (
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
              value={sleepHours}
              onChange={(e) => onSleepHoursChange(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="waterIntake">Minum Air (gelas)</Label>
            <Input
              id="waterIntake"
              type="number"
              placeholder="contoh: 6"
              value={waterIntake}
              onChange={(e) => onWaterIntakeChange(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="exercise">Olahraga (menit)</Label>
            <Input
              id="exercise"
              type="number"
              placeholder="contoh: 30"
              value={exercise}
              onChange={(e) => onExerciseChange(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyActivitiesSection;
