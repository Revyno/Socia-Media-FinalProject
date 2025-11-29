import {  useState, useEffect, useCallback } from 'react';
import { postApi } from '@/api/postApi';
import { likeApi } from '@/api/likeApi';
import { useAuth } from '@/hooks/useAuth';


export function PostProvider({ children }) {
    // token?
  const {  isAuthenticated } = useAuth();
  
  // State
  const [posts, setPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  /**
   * Fetch explore posts (all posts from all users)
   */
  const fetchExplorePosts = useCallback(async (pageNum = 1, size = 20) => {
    if (!isAuthenticated) return;

    setLoading(true);
    setError(null);

    try {
      const response = await postApi.getExplorePosts({ page: pageNum, size });
      
      if (response.data?.data) {
        if (pageNum === 1) {
          setPosts(response.data.data);
        } else {
          setPosts(prev => [...prev, ...response.data.data]);
        }
        
        // Check if there are more posts
        setHasMore(response.data.data.length === size);
        setPage(pageNum);
      }
    } catch (err) {
      console.error('Error fetching explore posts:', err);
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  /**
   * Fetch my posts (current user's posts)
   */
  const fetchMyPosts = useCallback(async (pageNum = 1, size = 50) => {
    if (!isAuthenticated) return;

    setLoading(true);
    setError(null);

    try {
      const response = await postApi.getMyPosts({ page: pageNum, size });
      
      if (response.data?.data) {
        if (pageNum === 1) {
          setMyPosts(response.data.data);
        } else {
          setMyPosts(prev => [...prev, ...response.data.data]);
        }
      }
    } catch (err) {
      console.error('Error fetching my posts:', err);
      setError('Failed to load your posts');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  /**
   * Create a new post
   */
  const createPost = useCallback(async (postData) => {
    setError(null);

    try {
      const response = await postApi.createPost(postData);
      
      if (response.data?.data) {
        const newPost = response.data.data;
        
        // Add to both lists
        setPosts(prev => [newPost, ...prev]);
        setMyPosts(prev => [newPost, ...prev]);
        
        return { success: true, data: newPost };
      }
      
      return { success: false, message: 'Failed to create post' };
    } catch (err) {
      console.error('Error creating post:', err);
      setError('Failed to create post');
      return { 
        success: false, 
        message: err.response?.data?.message || 'Failed to create post' 
      };
    }
  }, []);

  /**
   * Update an existing post
   */
  const updatePost = useCallback(async (postId, postData) => {
    setError(null);

    try {
      const response = await postApi.updatePost(postId, postData);
      
      if (response.data?.data) {
        const updatedPost = response.data.data;
        
        // Update in both lists
        setPosts(prev => prev.map(post => 
          post.id === postId ? { ...post, ...updatedPost } : post
        ));
        setMyPosts(prev => prev.map(post => 
          post.id === postId ? { ...post, ...updatedPost } : post
        ));
        
        return { success: true, data: updatedPost };
      }
      
      return { success: false, message: 'Failed to update post' };
    } catch (err) {
      console.error('Error updating post:', err);
      setError('Failed to update post');
      return { 
        success: false, 
        message: err.response?.data?.message || 'Failed to update post' 
      };
    }
  }, []);

  /**
   * Delete a post
   */
  const deletePost = useCallback(async (postId) => {
    setError(null);

    try {
      await postApi.deletePost(postId);
      
      // Remove from both lists
      setPosts(prev => prev.filter(post => post.id !== postId));
      setMyPosts(prev => prev.filter(post => post.id !== postId));
      
      return { success: true };
    } catch (err) {
      console.error('Error deleting post:', err);
      setError('Failed to delete post');
      return { 
        success: false, 
        message: err.response?.data?.message || 'Failed to delete post' 
      };
    }
  }, []);

  /**
   * Like/Unlike a post
   */
  const toggleLike = useCallback(async (postId, currentlyLiked) => {
    try {
      if (currentlyLiked) {
        await likeApi.unlikePost(postId);
      } else {
        await likeApi.likePost(postId);
      }

      // Update post in both lists
      const updatePostLike = (post) => {
        if (post.id === postId) {
          return {
            ...post,
            isLike: !currentlyLiked,
            totalLikes: currentlyLiked 
              ? post.totalLikes - 1 
              : post.totalLikes + 1
          };
        }
        return post;
      };

      setPosts(prev => prev.map(updatePostLike));
      setMyPosts(prev => prev.map(updatePostLike));

      return { success: true };
    } catch (err) {
      console.error('Error toggling like:', err);
      return { 
        success: false, 
        message: 'Failed to like/unlike post' 
      };
    }
  }, []);

  /**
   * Get post by ID
   */
  const getPostById = useCallback(async (postId) => {
    try {
      const response = await postApi.getPostById(postId);
      
      if (response.data?.data) {
        return { success: true, data: response.data.data };
      }
      
      return { success: false, message: 'Post not found' };
    } catch (err) {
      console.error('Error fetching post:', err);
      return { 
        success: false, 
        message: err.response?.data?.message || 'Failed to fetch post' 
      };
    }
  }, []);

  /**
   * Load more posts (for infinite scroll)
   */
  const loadMorePosts = useCallback(() => {
    if (!loading && hasMore) {
      fetchExplorePosts(page + 1);
    }
  }, [loading, hasMore, page, fetchExplorePosts]);

  /**
   * Refresh posts
   */
  const refreshPosts = useCallback(() => {
    setPage(1);
    setHasMore(true);
    fetchExplorePosts(1);
  }, [fetchExplorePosts]);

  /**
   * Refresh my posts
   */
  const refreshMyPosts = useCallback(() => {
    fetchMyPosts(1);
  }, [fetchMyPosts]);

  /**
   * Clear all posts
   */
  const clearPosts = useCallback(() => {
    setPosts([]);
    setMyPosts([]);
    setPage(1);
    setHasMore(true);
    setError(null);
  }, []);

  // Auto-fetch on mount if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchExplorePosts(1);
      fetchMyPosts(1);
    } else {
      clearPosts();
    }
  }, [isAuthenticated, fetchExplorePosts, fetchMyPosts, clearPosts]);

  const value = {
    // State
    posts,
    myPosts,
    loading,
    error,
    hasMore,
    page,
    
    // Actions
    fetchExplorePosts,
    fetchMyPosts,
    createPost,
    updatePost,
    deletePost,
    toggleLike,
    getPostById,
    loadMorePosts,
    refreshPosts,
    refreshMyPosts,
    clearPosts,
  };

  return (
    <PostContext.Provider value={value}>
      {children}
    </PostContext.Provider>
  );
}