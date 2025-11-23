import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export default function PostComments({ comments = [] }) {
  return (
    <div className="space-y-4 mt-4">
      {comments.map(comment => (
        <div key={comment.id} className="flex gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={comment.user?.profilePictureUrl} />
            <AvatarFallback>{comment.user?.name?.[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-white">
              <span className="font-medium">{comment.user?.username}</span>{' '}
              <span className="text-neutral-300">{comment.text}</span>
            </p>
            <p className="text-neutral-500 text-xs mt-1">{comment.createdAt}</p>
          </div>
        </div>
      ))}
    </div>
  );
}