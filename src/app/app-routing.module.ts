import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminhomeComponent } from './admin/adminhome/adminhome.component';
//Actor Home Components
import { AgenthomeComponent } from './agent/agenthome/agenthome.component';
import { ClienthomeComponent } from './client/clienthome/clienthome.component';
import { CompanyhomeComponent } from './company/companyhome/companyhome.component';
//Login Components
import { LoginComponent } from './login/login.component';
//Pages Components
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ErrorComponent } from './pages/error/error.component';
import { FeaturesComponent } from './pages/features/features.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { PolicytypesComponent } from './admin/policytypes/policytypes.component';
import { UserlistComponent } from './admin/userlist/userlist.component';
import { AdminViewComponent } from './admin/view/view.component';
import { PoliciesComponent } from './company/policies/policies.component';
import { AgentViewComponent } from './agent/view/view.component';
import { CompanyViewComponent } from './company/view/view.component';
import { ClientpoliciesComponent } from './agent/clientpolicies/clientpolicies.component';
import { CategoryComponent } from './agent/category/category.component';
import { ClientViewComponent } from './client/view/view.component';
import { CPoliciesComponent } from './client/policies/policies.component';
import { ReportComponent } from './report/report.component';
import { NomineeComponent } from './client/nominee/nominee.component';


const routes: Routes = [

  { path: 'Home', title: 'TruLyf | Home', component: HomeComponent },
  { path: 'About', title: 'TruLyf | About', component: AboutComponent },
  { path: 'Contact', title: 'TruLyf | Contact', component: ContactComponent },
  { path: 'Features', title: 'TruLyf | Features', component: FeaturesComponent },
  //Home Paths
  { path: 'Home/Client', title: 'TruLyf | Client Home', component: ClienthomeComponent },
  { path: 'Home/Agent', title: 'TruLyf | Agent Home', component: AgenthomeComponent },
  { path: 'Home/Company', title: 'TruLyf | Company Home', component: CompanyhomeComponent },
  { path: 'Home/Admin', title: 'TruLyf | Admin Home', component: AdminhomeComponent },
  //Admin
  { path: 'Admin/PolicyTypes', title: 'TruLyf | Admin | Policy Types', component: PolicytypesComponent },
  { path: 'Admin/UserList', title: 'TruLyf | Admin | User List', component: UserlistComponent },
  { path: 'Admin/View', title: 'TruLyf | Admin | View', component: AdminViewComponent },
  //Company
  { path: 'Company/Policies', title: 'TruLyf | Company | Policies', component: PoliciesComponent },
  { path: 'Company/View', title: 'TruLyf | Company | View', component: CompanyViewComponent },
  //Agent
  { path: 'Agent/ClientPolicies', title: 'TruLyf | Agent | Client Policies', component: ClientpoliciesComponent },
  { path: 'Agent/Category', title: 'TruLyf | Agent | Categories', component: CategoryComponent },
  { path: 'Agent/View', title: 'TruLyf | Agent | View', component: AgentViewComponent },
  //Client
  { path: 'Client/Policies', title: 'TruLyf | Client | Client Policies', component: CPoliciesComponent },
  { path: 'Client/Nominee', title: 'TruLyf | Client | Nominees', component: NomineeComponent },
  { path: 'Client/View', title: 'TruLyf | Client | View', component: ClientViewComponent },
  //Common
  { path: 'Reports',title : 'TruLyf | Report', component: ReportComponent },
  { path: 'Profile/:userid',title : 'TruLyf | Profile', component: ProfileComponent },
  { path: 'Register',title : 'TruLyf | Register', component: RegisterComponent },
  { path: 'Login',title : 'TruLyf | Login', component: LoginComponent },
  { path: '', title: 'TruLyf | Home', redirectTo: 'Home', pathMatch: 'full' },
  { path: '**', title: 'TruLyf | 404', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
