
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Edit, Save, X, Plus, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ContentItem {
  id: string;
  section_type: string;
  title: string;
  content: any;
  image_url: string;
  is_active: boolean;
}

const ContentManager = () => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('homepage_content')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContent(data || []);
    } catch (error) {
      console.error('Error fetching content:', error);
      toast.error('Gagal memuat konten');
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async (item: ContentItem) => {
    try {
      const { error } = await supabase
        .from('homepage_content')
        .upsert({
          id: item.id,
          section_type: item.section_type,
          title: item.title,
          content: item.content,
          image_url: item.image_url,
          is_active: item.is_active,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      
      toast.success('Konten berhasil disimpan');
      setEditingItem(null);
      fetchContent();
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error('Gagal menyimpan konten');
    }
  };

  const deleteContent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('homepage_content')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Konten berhasil dihapus');
      fetchContent();
    } catch (error) {
      console.error('Error deleting content:', error);
      toast.error('Gagal menghapus konten');
    }
  };

  const createNewContent = () => {
    const newItem: ContentItem = {
      id: '',
      section_type: 'health_tips',
      title: '',
      content: {},
      image_url: '',
      is_active: true,
    };
    setEditingItem(newItem);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Memuat konten...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary">Kelola Konten Homepage</h2>
          <p className="text-gray-600">Edit konten yang tampil di halaman utama</p>
        </div>
        <Button onClick={createNewContent}>
          <Plus className="mr-2" size={16} />
          Tambah Konten
        </Button>
      </div>

      {editingItem && (
        <Card className="border-primary">
          <CardHeader>
            <CardTitle>
              {editingItem.id ? 'Edit Konten' : 'Tambah Konten Baru'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Tipe Seksi</label>
                <select
                  value={editingItem.section_type}
                  onChange={(e) => setEditingItem({...editingItem, section_type: e.target.value})}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="health_tips">Tips Kesehatan</option>
                  <option value="education">Edukasi</option>
                  <option value="announcement">Pengumuman</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Judul</label>
                <Input
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                  placeholder="Masukkan judul"
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">URL Gambar</label>
              <Input
                value={editingItem.image_url}
                onChange={(e) => setEditingItem({...editingItem, image_url: e.target.value})}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Konten (JSON)</label>
              <Textarea
                value={JSON.stringify(editingItem.content, null, 2)}
                onChange={(e) => {
                  try {
                    const parsed = JSON.parse(e.target.value);
                    setEditingItem({...editingItem, content: parsed});
                  } catch (error) {
                    // Invalid JSON, don't update
                  }
                }}
                placeholder='{"description": "Konten deskripsi"}'
                className="min-h-[120px] font-mono"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={editingItem.is_active}
                onChange={(e) => setEditingItem({...editingItem, is_active: e.target.checked})}
                id="is_active"
              />
              <label htmlFor="is_active" className="text-sm font-medium">Aktif</label>
            </div>
            
            <div className="flex space-x-2">
              <Button onClick={() => saveContent(editingItem)}>
                <Save className="mr-2" size={16} />
                Simpan
              </Button>
              <Button variant="outline" onClick={() => setEditingItem(null)}>
                <X className="mr-2" size={16} />
                Batal
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {content.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <Badge variant="outline">{item.section_type}</Badge>
                  <Badge className={item.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                    {item.is_active ? 'Aktif' : 'Nonaktif'}
                  </Badge>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingItem(item)}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteContent(item.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
              
              {item.image_url && (
                <div className="mb-4">
                  <img 
                    src={item.image_url} 
                    alt={item.title}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
              )}
              
              <div className="bg-gray-50 p-3 rounded text-sm">
                <pre>{JSON.stringify(item.content, null, 2)}</pre>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {content.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold mb-2">Belum Ada Konten</h3>
          <p className="text-gray-600">Mulai dengan menambah konten untuk homepage</p>
        </div>
      )}
    </div>
  );
};

export default ContentManager;
