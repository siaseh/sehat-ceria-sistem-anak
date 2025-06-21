
import WelcomeCard from './WelcomeCard';
import HealthScoreCards from './HealthScoreCards';
import QuickActions from './QuickActions';
import AchievementsGrid from './AchievementsGrid';

interface StudentOverviewProps {
  studentData: {
    name: string;
    class: string;
    school: string;
    teacher: string;
    healthScore: number;
    gamesCompleted: number;
    totalGames: number;
    achievements: Array<{
      name: string;
      icon: string;
      earned: boolean;
    }>;
  };
  onTabChange: (tabId: string) => void;
}

const StudentOverview = ({ studentData, onTabChange }: StudentOverviewProps) => {
  return (
    <div className="space-y-6">
      <WelcomeCard studentData={studentData} />
      <HealthScoreCards studentData={studentData} />
      <QuickActions onTabChange={onTabChange} />
      <AchievementsGrid achievements={studentData.achievements} />
    </div>
  );
};

export default StudentOverview;
