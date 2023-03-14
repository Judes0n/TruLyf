import { StatusEnum } from '../enum/user-status-enum';

export interface Agent {
  agentID: number;
  userID: number;
  agentName: string;
  gender: string;
  phoneNum: number;
  dob: string;
  email: string;
  address: string;
  grade: number;
  profilePic: string;
  status: StatusEnum;
}
