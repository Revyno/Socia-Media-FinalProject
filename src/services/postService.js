import { postApi } from '@/api/postApi';

export const postService = {
  getExplorePosts: async (page = 1, size = 20) => {
    try {
      const response = await postApi.getExplorePosts({ page, size });
      return { success: true, data: response.data.data };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  getMyPosts: async (page = 1, size = 50) => {
    try {
      const response = await postApi.getMyPosts({ page, size });
      return { success: true, data: response.data.data };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  createPost: async (postData) => {
    try {
      const response = await postApi.createPost(postData);
      return { success: true, data: response.data.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to create post' };
    }
  },

  updatePost: async (postId, postData) => {
    try {
      const response = await postApi.updatePost(postId, postData);
      return { success: true, data: response.data.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to update post' };
    }
  },

  deletePost: async (postId) => {
    try {
      await postApi.deletePost(postId);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to delete post' };
    }
  },
};