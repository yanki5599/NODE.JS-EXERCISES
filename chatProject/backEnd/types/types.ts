import exp from "constants";

export interface User {
  userId: string;
  userName: string;
}
export interface Message {
  user: User;
  text: string;
  roomId: string;
  createdAt: Date;
}

export interface ChatRoom {
  roomId: string;
  createdAt: Date;
  users: User[];
}

export interface JoinRoomDto {
  roomId: string;
  user: User;
}
