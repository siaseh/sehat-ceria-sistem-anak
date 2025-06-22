
import { useState } from 'react';
import { toast } from 'sonner';
import HealthFormHeader from './HealthFormHeader';
import BasicDataSection from './BasicDataSection';
import PhysicalMeasurementsSection from './PhysicalMeasurementsSection';
import DailyActivitiesSection from './DailyActivitiesSection';
import NotesSection from './NotesSection';
import FormActions from './FormActions';

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

  const resetForm = () => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Health data submitted:', formData);
    toast.success('Data kesehatan berhasil disimpan! 📊');
    resetForm();
  };

  return (
    <div className="space-y-6">
      <HealthFormHeader />

      <form onSubmit={handleSubmit} className="space-y-6">
        <BasicDataSection
          date={formData.date}
          mood={formData.mood}
          onDateChange={(value) => handleInputChange('date', value)}
          onMoodChange={(value) => handleInputChange('mood', value)}
        />

        <PhysicalMeasurementsSection
          height={formData.height}
          weight={formData.weight}
          temperature={formData.temperature}
          bloodPressure={formData.bloodPressure}
          onHeightChange={(value) => handleInputChange('height', value)}
          onWeightChange={(value) => handleInputChange('weight', value)}
          onTemperatureChange={(value) => handleInputChange('temperature', value)}
          onBloodPressureChange={(value) => handleInputChange('bloodPressure', value)}
        />

        <DailyActivitiesSection
          sleepHours={formData.sleepHours}
          waterIntake={formData.waterIntake}
          exercise={formData.exercise}
          onSleepHoursChange={(value) => handleInputChange('sleepHours', value)}
          onWaterIntakeChange={(value) => handleInputChange('waterIntake', value)}
          onExerciseChange={(value) => handleInputChange('exercise', value)}
        />

        <NotesSection
          notes={formData.notes}
          onNotesChange={(value) => handleInputChange('notes', value)}
        />

        <FormActions
          onReset={resetForm}
          onSubmit={() => {}}
        />
      </form>
    </div>
  );
};

export default HealthForm;
