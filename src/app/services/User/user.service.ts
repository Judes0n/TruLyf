import { Injectable } from '@angular/core';
import { StatusEnum } from 'src/app/enum/user-status-enum';
import { UserTypeEnum } from 'src/app/enum/user-type-enum';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userList: User[] = [
    {
      userID: 0,
      userName: 'Admin',
      password: 'admin',
      type: UserTypeEnum.Admin,
      status: StatusEnum.Active,
    },
  ];
  constructor() {}
  getUsers() {
    return this.userList;
  }
  getUsersByID(userid: number) {
    return this.userList.find((x) => x.userID == userid);
  }
  addUser(user: User) {
    user.userID = new Date().getTime();
    this.userList.push(user);
  }
  updateUser(user: User) {
    const userIndex = this.userList.findIndex((x) => x.userID == user.userID);
    if (userIndex != null && userIndex != undefined) {
      this.userList[userIndex] = user;
    }
  }
  removeUser(userid: number) {
    this.userList = this.userList.filter((x) => x.userID != userid);
  }
}
