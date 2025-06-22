
import { Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const HealthFormHeader = () => {
  return (
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
  );
};

export default HealthFormHeader;
