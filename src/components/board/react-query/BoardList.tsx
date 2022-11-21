import { useEffect, useRef, useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { useInfiniteQuery } from '@tanstack/react-query';
import { PostsResponse } from '../../../interface';
import axiosInstance from '../../../utils/axiosInstance';
import PostItem from '../PostItem';

const BoardList = () => {
  const { data: postsData, fetchNextPage } = useInfiniteQuery({
    queryKey: ['getPosts'],
    queryFn: ({ pageParam = 1 }) => axiosInstance.get<PostsResponse>(`/board?page=${pageParam}`).then(res => res.data.posts),
    getNextPageParam: (_, allPage) => allPage.length * 8 + 1,
  });

  const spinnerRef = useRef<HTMLDivElement>(null);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > 0) {
            fetchNextPage();
          }
        });
      },
      {
        threshold: 1,
      }
    );

    spinnerRef.current && observer.observe(spinnerRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (postsData && postsData.pages.slice(-1)[0].length < 8) {
      setIsEnd(true);
    }
  }, [postsData]);

  return (
    <div className='py-4'>
      <ul className='overflow-hidden'>{postsData?.pages.map(posts => posts.map(post => <PostItem post={post} key={post.id} />))}</ul>
      {!isEnd && (
        <div ref={spinnerRef} className='flex justify-center py-4'>
          <ImSpinner2 className='animate-spin' size={40} />
        </div>
      )}
    </div>
  );
};
export default BoardList;
