import { StatusEnum } from '../enum/user-status-enum';

export interface Client {
  clientId: number;
  userID: number;
  clientName: string;
  gender: string;
  dob: string;
  address: string;
  profilePic: string;
  phoneNum: string;
  email : string;
  status: StatusEnum;
}
