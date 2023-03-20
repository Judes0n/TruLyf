import { StatusEnum } from '../enum/user-status-enum';

export interface Client {
  clientId: number;
  userID: number;
  clientName: string;
  gender: string;
  dob: string;
  address: string;
  profilePic: string;
  phoneNum: number;
  email : string;
  status: StatusEnum;
}
