
import { Card, CardContent } from '@/components/ui/card';

interface WelcomeCardProps {
  studentData: {
    name: string;
    class: string;
    school: string;
    teacher: string;
  };
}

const WelcomeCard = ({ studentData }: WelcomeCardProps) => {
  return (
    <Card className="bg-gradient-to-r from-primary to-secondary text-white border-0">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Halo, {studentData.name}! 👋
            </h1>
            <p className="text-white/90 mb-2">
              Kelas {studentData.class} - {studentData.school}
            </p>
            <p className="text-white/80">
              Guru Wali: {studentData.teacher}
            </p>
          </div>
          <div className="text-6xl animate-bounce-slow">
            😊
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;
