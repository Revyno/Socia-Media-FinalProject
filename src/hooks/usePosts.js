// import { useState, useEffect } from 'react';
// import { postApi } from '../api/postApi';

// export function usePosts(type = 'explore') {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const res = type === 'my' 
//           ? await postApi.getMyPosts({ size: 50 })
//           : await postApi.getExplorePosts({ size: 20 });
//         setPosts(res.data.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, [type]);

//   return { posts, loading, error, setPosts };
// }
import { useContext } from 'react';
import { PostContext } from '@/contexts/PostContext';

export function usePosts() {
  const context = useContext(PostContext);
  
  if (!context) {
    throw new Error('usePost must be used within PostProvider');
  }
  
  return context;
}