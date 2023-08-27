export default interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface UserPublic {
  id: number;
  username: string;
  email: string;
}