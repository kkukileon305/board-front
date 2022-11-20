import { useQuery } from '@tanstack/react-query';
import { Post, PostsResponse } from '../../../interface';
import axiosInstance from '../../../utils/axiosInstance';
import PostItem from '../PostItem';

const BoardList = () => {
  const { data: posts } = useQuery<Post[]>({
    queryFn: () => axiosInstance.get<PostsResponse>('/board').then(res => res.data.posts),
    queryKey: ['getPosts'],
  });

  return (
    <div className='py-4'>
      <ul className='border flex flex-col-reverse'>{posts ? posts.map(post => <PostItem post={post} key={post.id} />) : <h2>불러오는중...</h2>}</ul>
    </div>
  );
};
export default BoardList;
