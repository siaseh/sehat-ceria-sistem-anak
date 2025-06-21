
import { Heart, AlertCircle, Gamepad2, FileText, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface QuickActionsProps {
  onTabChange: (tabId: string) => void;
}

const QuickActions = ({ onTabChange }: QuickActionsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="text-primary" />
          <span>Aktivitas Hari Ini</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button
            onClick={() => onTabChange('health-data')}
            className="h-20 bg-gradient-to-br from-kid-pink to-pink-400 hover:from-pink-400 hover:to-pink-500 text-white flex-col space-y-2"
          >
            <Heart size={24} />
            <span>Input Kesehatan</span>
          </Button>
          <Button
            onClick={() => onTabChange('complaints')}
            className="h-20 bg-gradient-to-br from-kid-orange to-orange-400 hover:from-orange-400 hover:to-orange-500 text-white flex-col space-y-2"
          >
            <AlertCircle size={24} />
            <span>Lapor Keluhan</span>
          </Button>
          <Button
            onClick={() => onTabChange('games')}
            className="h-20 bg-gradient-to-br from-kid-purple to-purple-400 hover:from-purple-400 hover:to-purple-500 text-white flex-col space-y-2"
          >
            <Gamepad2 size={24} />
            <span>Main Game</span>
          </Button>
          <Button
            onClick={() => onTabChange('summary')}
            className="h-20 bg-gradient-to-br from-kid-blue to-blue-400 hover:from-blue-400 hover:to-blue-500 text-white flex-col space-y-2"
          >
            <FileText size={24} />
            <span>Lihat Rekap</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
