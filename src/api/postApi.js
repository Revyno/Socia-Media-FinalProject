// postApi.js - PERBAIKI DENGAN ENDPOINT YANG BENAR
import apiService from './apiService';

export const postApi = {
  // Endpoint untuk explore posts (sudah benar)
  getExplorePosts: (params = { size: 10, page: 1 }) => 
    apiService.get('/api/v1/explore-post', { params }),
  
  // Endpoint untuk posts by user ID
  getPostsByUserId: (userId, params = { size: 10, page: 1 }) => 
    apiService.get(`/api/v1/users-post/${userId}`, { params }),
  
  // Endpoint untuk posts yang di-follow (my feed)
  getMyPosts: (params = { size: 10, page: 1 }) => 
    apiService.get('/api/v1/following-post', { params }),
  
  // Endpoint untuk single post
  getPostById: (postId) => 
    apiService.get(`/api/v1/post/${postId}`),
  
  // Endpoint untuk create post
  createPost: (data) => 
    apiService.post('/api/v1/create-post', data),
  
  // Endpoint untuk update post
  updatePost: (postId, data) => 
    apiService.post(`/api/v1/update-post/${postId}`, data),
  
  // Endpoint untuk delete post
  deletePost: (postId) => 
    apiService.delete(`/api/v1/delete-post/${postId}`),
  
  // Tambahkan endpoint untuk search posts dan users jika ada
  searchPosts: (query, params = { size: 10, page: 1 }) =>
    apiService.get(`/api/v1/search/posts?q=${query}`, { params }),
    
  searchUsers: (query, params = { size: 10, page: 1 }) =>
    apiService.get(`/api/v1/search/users?q=${query}`, { params }),
};