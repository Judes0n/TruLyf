import { PenaltyStatusEnum } from "../enum/Penalty-Status-Enum.enum";

export interface Premium {
  premiumId: number;
  clientPolicyId: number;
  dateOfPenalty: string;
  penalty: number;
  status : PenaltyStatusEnum;
}
