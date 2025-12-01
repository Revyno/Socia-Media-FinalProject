// followApi.js - PERBAIKI DENGAN ENDPOINT YANG BENAR
import apiService from './apiService';

export const followApi = {
  followUser: (userId) => apiService.post(`/api/v1/follow/${userId}`),
  
  unfollowUser: (userId) => apiService.post(`/api/v1/unfollow/${userId}`),
  
  // Fix: Pastikan parameter dikirim sebagai object
  getMyFollowers: (params = {}) => apiService.get('/api/v1/my-followers', { params }),

  getMyFollowing: (params = {}) => apiService.get('/api/v1/my-following', { params }),
  
  // Fix: Pastikan parameter dikirim sebagai object
  getFollowersByUserId: (userId, params = {}) => 
    apiService.get(`/api/v1/my-followers/${userId}`, { params }),
  
  getFollowingByUserId: (userId, params = {}) => 
    apiService.get(`/api/v1/my-following/${userId}`, { params }),
};