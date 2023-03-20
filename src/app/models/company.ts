import { StatusEnum } from '../enum/user-status-enum';

export interface Company {
  companyId: number;
  userId: number;
  companyName: string;
  address: string;
  email: string;
  phoneNum: string;
  profilePic: string;
  status: StatusEnum;
}
