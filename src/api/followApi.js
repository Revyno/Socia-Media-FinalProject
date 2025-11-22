import apiService from './apiService';

export const followApi = {
  followUser: (userId) => apiService.post(`/api/v1/follow/${userId}`),
  unfollowUser: (userId) => apiService.post(`/api/v1/unfollow/${userId}`),
  getMyFollowers: (params) => apiService.get('/api/v1/my-followers', { params }),
  getMyFollowing: (params) => apiService.get('/api/v1/my-following', { params }),
  getFollowersByUserId: (userId, params) => apiService.get(`/api/v1/followers-by-userId/${userId}`, { params }),
  getFollowingByUserId: (userId, params) => apiService.get(`/api/v1/following-by-userId/${userId}`, { params }),
};