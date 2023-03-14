import { StatusEnum } from "../enum/user-status-enum"

export interface Policy {
  policyID : number,
	companyID : number ,
	policytypeID : number ,
	policyName : string,
	timePeriod : number ,
	policyAmount : number,
	status : StatusEnum,
}
