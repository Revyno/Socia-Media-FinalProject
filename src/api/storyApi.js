import apiService from './apiService';

export const storyApi = {
  createStory: (data) => apiService.post('/api/v1/create-story', data),
  deleteStory: (id) => apiService.delete(`/api/v1/delete-story/${id}`),
  getStoryById: (id) => apiService.get(`/api/v1/story/${id}`),
  getMyFollowingStories: (params) => apiService.get('/api/v1/my-following-stories', { params }),
  getStoryViewsByStoryId: (id, params) => apiService.get(`/api/v1/story-views-by-storyId/${id}`, { params }),
};