import { useState, useEffect, useCallback } from 'react';
import { userService } from '@/services/userService';

/**
 * Custom hook for fetching and managing user data
 * @param {string} userId - Optional user ID. If not provided, fetches current user
 */
export function useUser(userId = null) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch user data
   */
  const fetchUser = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = userId
        ? await userService.getUserById(userId)
        : await userService.getCurrentUser();

      if (result.success) {
        setUser(result.data);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Failed to fetch user data');
      console.error('useUser error:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  /**
   * Update user data
   */
  const updateUser = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await userService.updateProfile(userData);

      if (result.success) {
        setUser(result.data);
        return { success: true, data: result.data };
      } else {
        setError(result.message);
        return { success: false, message: result.message };
      }
    } catch (err) {
      const message = 'Failed to update user';
      setError(message);
      return { success: false, message };

    } finally {
      setLoading(false);
    }
  };

  /**
   * Refresh user data
   */
  const refresh = () => {
    fetchUser();
  };

  // Fetch user on mount or when userId changes
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return {
    user,
    loading,
    error,
    updateUser,
    refresh,
  };
}

/**
 * Hook for managing user followers
 */
export function useUserFollowers(userId = null) {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFollowers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await userService.getFollowers(userId);

      if (result.success) {
        setFollowers(result.data);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Failed to fetch followers');
      console.error('useUserFollowers error:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchFollowers();
  }, [fetchFollowers]);

  return {
    followers,
    loading,
    error,
    refresh: fetchFollowers,
  };
}

/**
 * Hook for managing user following
 */
export function useUserFollowing(userId = null) {
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFollowing = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await userService.getFollowing(userId);

      if (result.success) {
        setFollowing(result.data);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Failed to fetch following');
      console.error('useUserFollowing error:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchFollowing();
  }, [fetchFollowing]);

  return {
    following,
    loading,
    error,
    refresh: fetchFollowing,
  };
}

/**
 * Hook for managing user stats (followers, following, posts count)
 */
export function useUserStats(userId = null) {
  const [stats, setStats] = useState({
    followers: 0,
    following: 0,
    posts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await userService.getUserStats(userId);

      if (result.success) {
        setStats(prevStats => ({
          ...prevStats,
          ...result.data,
        }));
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Failed to fetch stats');
      console.error('useUserStats error:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
    error,
    refresh: fetchStats,
  };
}

/**
 * Hook for searching users
 */
export function useUserSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = useCallback(async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await userService.searchUsers(searchQuery);

      if (result.success) {
        setResults(result.data);
      } else {
        setError(result.message);
        setResults([]);
      }
    } catch (err) {
      setError('Failed to search users');
      setResults([]);
      console.error('useUserSearch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        search(query);
      } else {
        setResults([]);
      }
    }, 300); // Debounce

    return () => clearTimeout(timer);
  }, [query, search]);

  return {
    query,
    setQuery,
    results,
    loading,
    error,
    search,
  };
}