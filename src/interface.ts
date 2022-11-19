export interface User {
  createDate: Date;
  email: string;
  id: number;
  password: string;
  position: number;
  uptateDate: Date;
  username: string;
}

export interface LoginResponseBody {
  message: string;
  token?: string;
  user?: User;
}

export interface PostsResponse {
  posts: Post[];
}

export interface Post {
  id: number;
  createDate: Date;
  uptateDate: Date;
  username: string;
  body: string;
}
