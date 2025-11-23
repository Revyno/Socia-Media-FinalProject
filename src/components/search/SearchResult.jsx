import PostGrid from '@/components/post/PostGrid';
import UserList from '@/components/user/UserList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SearchResults({ posts, users }) {
  return (
    <Tabs defaultValue="posts" className="w-full">
      <TabsList className="bg-neutral-900 border-b border-neutral-800">
        <TabsTrigger value="posts">Posts ({posts.length})</TabsTrigger>
        <TabsTrigger value="users">Users ({users.length})</TabsTrigger>
      </TabsList>
      
      <TabsContent value="posts" className="mt-4">
        <PostGrid posts={posts} />
      </TabsContent>
      
      <TabsContent value="users" className="mt-4">
        <UserList users={users} />
      </TabsContent>
    </Tabs>
  );
}