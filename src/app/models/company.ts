import { StatusEnum } from '../enum/user-status-enum';

export interface Company {
  companyID: number;
  userID: number;
  companyName: string;
  address: string;
  email: string;
  phoneNum: string;
  profilePic: string;
  status: StatusEnum;
}
