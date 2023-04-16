import { StatusEnum } from "../enum/user-status-enum"
import { Company } from "./company"
import { Policytype } from "./policytype"

export interface Policy {
  policyId : number,
	companyId : number ,
	policytypeId : number ,
	policyName : string,
	timePeriod : number ,
	policyAmount : number,
	status : StatusEnum
}
