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
