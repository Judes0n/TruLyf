import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientComponent } from "./client/client.component";
import { AgentComponent } from "./agent/agent.component";
import { CompanyComponent } from "./company/company.component";
import {  RouterModule } from "@angular/router";
import { LoginComponent } from "./login.component";
import { ReactiveFormsModule,FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    ClientComponent,
    AgentComponent,
    CompanyComponent,
    LoginComponent,
  ],
  imports : [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class LoginModule
{

}
