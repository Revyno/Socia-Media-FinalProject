import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { X } from 'lucide-react';

export default function StoryViewer({ open, onOpenChange, story }) {
  if (!story) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black border-none p-0 max-w-md h-[90vh]">
        <div className="relative w-full h-full">
          <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/80 to-transparent">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={story.user?.profilePictureUrl} />
                  <AvatarFallback>{story.user?.name?.[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-white font-medium">{story.user?.name}</p>
                  <p className="text-neutral-300 text-xs">{story.createdAt}</p>
                </div>
              </div>
              <button onClick={() => onOpenChange(false)}>
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
          
          <img src={story.imageUrl} alt="Story" className="w-full h-full object-contain" />
        </div>
      </DialogContent>
    </Dialog>
  );
}