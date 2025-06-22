
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface NotesSectionProps {
  notes: string;
  onNotesChange: (value: string) => void;
}

const NotesSection = ({ notes, onNotesChange }: NotesSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Catatan Tambahan</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Ceritakan tentang kesehatanmu hari ini, makanan yang dimakan, atau hal lain yang ingin disampaikan..."
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          rows={4}
        />
      </CardContent>
    </Card>
  );
};

export default NotesSection;
