import { StatusEnum } from "../enum/user-status-enum"

export interface Policy {
  policyId : number,
	companyId : number ,
	policytypeId : number ,
	policyName : string,
	timePeriod : number ,
	policyAmount : number,
	status : StatusEnum,
}
