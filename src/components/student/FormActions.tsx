
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FormActionsProps {
  onReset: () => void;
  onSubmit: () => void;
}

const FormActions = ({ onReset, onSubmit }: FormActionsProps) => {
  return (
    <div className="flex justify-end space-x-4">
      <Button
        type="button"
        variant="outline"
        onClick={onReset}
      >
        Reset Form
      </Button>
      <Button
        type="submit"
        className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
        onClick={onSubmit}
      >
        <Heart className="mr-2" size={16} />
        Simpan Data Kesehatan
      </Button>
    </div>
  );
};

export default FormActions;
