import { StatusEnum } from "../enum/user-status-enum";

export interface Client
{
  clientID : number,
  userID : number,
  clientName : string,
  gender : string,
  dob : string,
  address : string,
  profilePic : string,
  phoneNum : number,
  status : StatusEnum
}
