import { PaymentStatusEnum } from "../enum/payment-status-enum.enum";

export interface Payments {
  paymentId : number;
  clientPolicyId : number;
  transactionId : string;
  time : string;
  amount : number;
  status : PaymentStatusEnum;
}
