import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Plus } from 'lucide-react';

export default function StoryCircle({ story, isAddStory = false, onClick }) {
  if (isAddStory) {
    return (
      <button onClick={onClick} className="flex flex-col items-center gap-2">
        <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center border-2 border-neutral-700">
          <Plus className="w-6 h-6 text-white" />
        </div>
        <span className="text-xs text-neutral-400">Add Story</span>
      </button>
    );
  }

  return (
    <button onClick={onClick} className="flex flex-col items-center gap-2">
      <div className="p-0.5 from-yellow-400 to-pink-600 rounded-full">
        <div className="p-0.5 bg-neutral-900 rounded-full">
          <Avatar className="w-14 h-14">
            <AvatarImage src={story.user?.profilePictureUrl} />
            <AvatarFallback>{story.user?.name?.[0]}</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <span className="text-xs text-neutral-400 max-w-[60px] truncate">{story.user?.username}</span>
    </button>
  );
}