import { ImageIcon, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
// import CreatePostDialog from '@/components/post/CreatePostDialog';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-neutral-900/95 backdrop-blur-sm border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-lg">
            <ImageIcon className="w-6 h-6 text-neutral-900" />
          </div>
          <h1 className="text-2xl font-bold text-white">Social Media</h1>
        </div>
        {/* <CreatePostDialog /> */}
        <Button variant="outline">
          <Upload className="w-4 h-4 mr-2" />
          Upload
        </Button>
      </div>
    </header>
  );
}