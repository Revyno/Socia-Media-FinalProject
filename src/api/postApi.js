import apiService from './apiService';

export const postApi = {
  getExplorePosts: (params) => apiService.get('/api/v1/explore-post', { params }),
  getMyPosts: (params) => apiService.get('/api/v1/my-post', { params }),
  createPost: (data) => apiService.post('/api/v1/create-post', data),
  updatePost: (id, data) => apiService.post(`/api/v1/update-post/${id}`, data),
  deletePost: (id) => apiService.delete(`/api/v1/delete-post/${id}`),
  getPostById: (id) => apiService.get(`/api/v1/post/${id}`),
};