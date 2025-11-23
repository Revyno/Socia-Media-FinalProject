import { userApi } from '@/api/userApi';
import { followApi } from '@/api/followApi';
import { handleApiError } from '@/utils/errorHandler';

export const userService = {
  /**
   * Get current logged in user profile
   */
  getCurrentUser: async () => {
    try {
      const response = await userApi.getCurrentUser();
      return {
        success: true,
        data: response.data.data,
      };
    } catch (error) {
      const errorData = handleApiError(error);
      return {
        success: false,
        message: errorData.message,
      };
    }
  },

  /**
   * Get user by ID
   */
  getUserById: async (userId) => {
    try {
      const response = await userApi.getUserById(userId);
      return {
        success: true,
        data: response.data.data,
      };
    } catch (error) {
      const errorData = handleApiError(error);
      return {
        success: false,
        message: errorData.message,
      };
    }
  },

  /**
   * Update user profile
   */
  updateProfile: async (userData) => {
    try {
      const response = await userApi.updateProfile(userData);
      return {
        success: true,
        data: response.data.data,
        message: 'Profile updated successfully',
      };
    } catch (error) {
      const errorData = handleApiError(error);
      return {
        success: false,
        message: errorData.message || 'Failed to update profile',
      };
    }
  },

  /**
   * Get user's followers
   */
  getFollowers: async (userId = null, page = 1, size = 100) => {
    try {
      let response;
      if (userId) {
        response = await followApi.getFollowersByUserId(userId, { page, size });
      } else {
        response = await followApi.getMyFollowers({ page, size });
      }
      
      return {
        success: true,
        data: response.data.data || [],
        pagination: response.data.pagination,
      };
    } catch (error) {
      const errorData = handleApiError(error);
      return {
        success: false,
        message: errorData.message,
        data: [],
      };
    }
  },

  /**
   * Get user's following
   */
  getFollowing: async (userId = null, page = 1, size = 100) => {
    try {
      let response;
      if (userId) {
        response = await followApi.getFollowingByUserId(userId, { page, size });
      } else {
        response = await followApi.getMyFollowing({ page, size });
      }
      
      return {
        success: true,
        data: response.data.data || [],
        pagination: response.data.pagination,
      };
    } catch (error) {
      const errorData = handleApiError(error);
      return {
        success: false,
        message: errorData.message,
        data: [],
      };
    }
  },

  /**
   * Follow a user
   */
  followUser: async (userId) => {
    try {
      const response = await followApi.followUser(userId);
      return {
        success: true,
        data: response.data.data,
        message: 'User followed successfully',
      };
    } catch (error) {
      const errorData = handleApiError(error);
      return {
        success: false,
        message: errorData.message || 'Failed to follow user',
      };
    }
  },

  /**
   * Unfollow a user
   */
  unfollowUser: async (userId) => {
    try {
      const response = await followApi.unfollowUser(userId);
      return {
        success: true,
        data: response.data.data,
        message: 'User unfollowed successfully',
      };
    } catch (error) {
      const errorData = handleApiError(error);
      return {
        success: false,
        message: errorData.message || 'Failed to unfollow user',
      };
    }
  },

  /**
   * Search users by name or username
   */
  searchUsers: async (query) => {
    try {
      // Note: Implement this if API has search endpoint
      // For now, we can filter from followers/following
      const response = await followApi.getMyFollowing({ size: 100 });
      const users = response.data.data || [];
      
      if (!query) return { success: true, data: users };
      
      const filtered = users.filter(user => 
        user.name?.toLowerCase().includes(query.toLowerCase()) ||
        user.username?.toLowerCase().includes(query.toLowerCase())
      );
      
      return {
        success: true,
        data: filtered,
      };
    } catch (error) {
      const errorData = handleApiError(error);
      return {
        success: false,
        message: errorData.message,
        data: [],
      };
    }
  },

  /**
   * Get user statistics
   */
  getUserStats: async (userId = null) => {
    try {
      const [followersRes, followingRes] = await Promise.all([
        userId 
          ? followApi.getFollowersByUserId(userId, { size: 1 })
          : followApi.getMyFollowers({ size: 1 }),
        userId
          ? followApi.getFollowingByUserId(userId, { size: 1 })
          : followApi.getMyFollowing({ size: 1 }),
      ]);

      return {
        success: true,
        data: {
          followers: followersRes.data.pagination?.total || 0,
          following: followingRes.data.pagination?.total || 0,
        },
      };
    } catch (error) {
      return {
        success: false,
        data: {
          followers: 0,
          following: 0,
        },
        
        message: 'Failed to fetch user statistics',
        
      };
    }
  },
};