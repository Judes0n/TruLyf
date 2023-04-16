import { Client } from "./client";

export interface Nominee {
  nomineeId: number;
  clientId: number ;
  nomineeName: string;
  relation: string;
  address: string;
  phoneNum: string;
}
