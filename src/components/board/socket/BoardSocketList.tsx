import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Post, PostsResponse } from '../../../interface';
import Button from '../../Button';
import PostItem from '../PostItem';

const socket = io('http://localhost:4000', { autoConnect: false });

const BoardSocketList = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    socket.connect();

    socket.on('update', ({ posts }: PostsResponse) => setPosts(posts));

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className='py-4 flex flex-col'>
      <ul className='border flex flex-col-reverse'>{!!posts.length ? posts.map(post => <PostItem post={post} key={post.id} />) : <h2>불러오는중...</h2>}</ul>
    </div>
  );
};
export default BoardSocketList;
