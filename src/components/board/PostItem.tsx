import { Post } from '../../interface';

interface PostItem {
  post: Post;
}

const PostItem = ({ post }: PostItem) => {
  return (
    <li key={post.id} className='p-2 border overflow-hidden animate-fadeIn'>
      <div className='flex items-end gap-4'>
        <h3 className='font-bold text-xl'>{post.username}</h3>
        <p className='text-gray-400'>
          {new Date(post.createDate).getDate()}d {new Date(post.createDate).getHours()}h {new Date(post.createDate).getMinutes()}m
        </p>
      </div>
      <p className='mt-2 whitespace-pre-line'>{post.body}</p>
    </li>
  );
};
export default PostItem;
