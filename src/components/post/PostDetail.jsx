import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import PostActions from './PostActions';
import PostComments from './PostComments';

export default function PostDetail({ open, onOpenChange, post }) {
  if (!post) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-neutral-900 border-neutral-800 max-w-4xl p-0">
        <div className="grid md:grid-cols-2">
          <img src={post.imageUrl} alt={post.caption} className="w-full h-full object-cover" />
          
          <div className="p-6 flex flex-col">
            <div className="flex items-center gap-3 pb-4 border-b border-neutral-800">
              <Avatar>
                <AvatarImage src={post.user?.profilePictureUrl} />
                <AvatarFallback>{post.user?.name?.[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-white font-medium">{post.user?.name}</p>
                <p className="text-neutral-400 text-sm">@{post.user?.username}</p>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto py-4">
              {post.caption && (
                <p className="text-white mb-4">
                  <span className="font-medium">{post.user?.username}</span>{' '}
                  <span className="text-neutral-300">{post.caption}</span>
                </p>
              )}
              <PostComments comments={post.comments || []} />
            </div>
            
            <div className="pt-4 border-t border-neutral-800">
              <PostActions post={post} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}