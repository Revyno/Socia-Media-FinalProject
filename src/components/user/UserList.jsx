import { useState } from 'react';
import UserCard from './UserCard';
import EmptyState from '@/components/common/EmptyState';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Input } from '@/components/ui/input';
import { Users, Search } from 'lucide-react';

export default function UserList({ 
  users = [], 
  loading = false,
  emptyMessage = 'No users found',
  emptyDescription = '',
  showSearch = false,
  showFollowButton = true,
  onUserClick = null,
}) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter users based on search query
  const filteredUsers = users.filter(user => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      user.name?.toLowerCase().includes(query) ||
      user.username?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query)
    );
  });

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      {showSearch && users.length > 0 && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users..."
            className="pl-10 bg-neutral-900 border-neutral-800 text-white"
          />
        </div>
      )}

      {/* User Count */}
      {filteredUsers.length > 0 && (
        <p className="text-sm text-neutral-400">
          {filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'}
          {searchQuery && ` matching "${searchQuery}"`}
        </p>
      )}

      {/* Empty State */}
      {filteredUsers.length === 0 && (
        <EmptyState
          icon={Users}
          title={searchQuery ? `No users matching "${searchQuery}"` : emptyMessage}
          description={emptyDescription}
        />
      )}

      {/* User List */}
      <div className="space-y-3">
        {filteredUsers.map(user => (
          <UserCard
            key={user.id}
            user={user}
            showFollowButton={showFollowButton}
            onClick={() => onUserClick?.(user)}
          />
        ))}
      </div>
    </div>
  );
}