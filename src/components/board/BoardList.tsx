import { useQuery } from '@tanstack/react-query';
import { Post, PostsResponse } from '../../interface';
import axiosInstance from '../../utils/axiosInstance';

const BoardList = () => {
  const { data: posts } = useQuery<Post[]>({
    queryFn: () => axiosInstance.get<PostsResponse>('/board').then(res => res.data.posts),
    queryKey: ['getPosts'],
  });

  return (
    <div className='p-4'>
      <ul>
        {posts ? (
          posts.map(post => (
            <li key={post.id}>
              <div className='flex items-end gap-4'>
                <h3 className='font-bold text-xl'>{post.username}</h3>
                <p className=''>
                  {new Date(post.createDate).getDate()}d {new Date(post.createDate).getHours()}h {new Date(post.createDate).getMinutes()}m
                </p>
              </div>
              <p>{post.body}</p>
            </li>
          ))
        ) : (
          <h2>불러오는중...</h2>
        )}
      </ul>
    </div>
  );
};
export default BoardList;
