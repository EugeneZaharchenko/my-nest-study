import { Injectable } from '@nestjs/common';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: 1,
      name: 'UserA',
      email: 'userA@example.com',
      password: 'secretKey1',
    },
    {
      id: 2,
      name: 'UserB',
      email: 'userB@example.com',
      password: 'secretKey2',
    },
    {
      id: 3,
      name: 'UserC',
      email: 'userC@example.com',
      password: 'secretKey3',
    },
  ];

  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

  addUser(user: User) {
    this.users.push(user);
    return this.users.length;
  }
}
