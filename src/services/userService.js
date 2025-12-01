import { userApi } from '@/api/userApi';
import { followApi } from '@/api/followApi';
import { postApi } from '@/api/postApi';

export const userService = {
  // Get current user
  async getCurrentUser() {
    try {
      const response = await userApi.getCurrentUser();
      return {
        success: true,
        data: response.data?.data || response.data,
        message: 'User data fetched successfully'
      };
    } catch (error) {
      console.error('Error fetching current user:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch user data',
        data: null
      };
    }
  },

  // Get user by ID
  async getUserById(userId) {
    try {
      const response = await userApi.getUserById(userId);
      return {
        success: true,
        data: response.data?.data || response.data,
        message: 'User data fetched successfully'
      };
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch user data',
        data: null
      };
    }
  },

  // Update user profile
  async updateProfile(userData) {
    try {
      const response = await userApi.updateProfile(userData);
      return {
        success: true,
        data: response.data?.data || response.data,
        message: 'Profile updated successfully'
      };
    } catch (error) {
      console.error('Error updating profile:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update profile',
        data: null
      };
    }
  },

  // Get user followers
  async getFollowers(userId) {
    try {
      const response = await followApi.getFollowersByUserId(userId, { size: 100 });
      return {
        success: true,
        data: response.data?.data || [],
        message: 'Followers fetched successfully'
      };
    } catch (error) {
      console.error('Error fetching followers:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch followers',
        data: []
      };
    }
  },

  // Get user following
  async getFollowing(userId) {
    try {
      const response = await followApi.getFollowingByUserId(userId, { size: 100 });
      return {
        success: true,
        data: response.data?.data || [],
        message: 'Following fetched successfully'
      };
    } catch (error) {
      console.error('Error fetching following:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch following',
        data: []
      };
    }
  },

  // Get user stats
  async getUserStats(userId) {
    try {
      const [followersRes, followingRes, postsRes] = await Promise.all([
        this.getFollowers(userId),
        this.getFollowing(userId),
        postApi.getPostsByUserId(userId, { size: 1 })
      ]);

      return {
        success: true,
        data: {
          followers: followersRes.data?.length || 0,
          following: followingRes.data?.length || 0,
          posts: postsRes.data?.data?.totalItems || postsRes.data?.data?.posts?.length || 0
        },
        message: 'User stats fetched successfully'
      };
    } catch (error) {
      console.error('Error fetching user stats:', error);
      return {
        success: false,
        message: 'Failed to fetch user stats',
        data: { followers: 0, following: 0, posts: 0 }
      };
    }
  },

  // Search users
  async searchUsers(query) {
    try {
      const response = await userApi.searchUsers(query, { size: 20 });
      return {
        success: true,
        data: response.data?.data || [],
        message: 'Users search completed'
      };
    } catch (error) {
      console.error('Error searching users:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to search users',
        data: []
      };
    }
  }
};