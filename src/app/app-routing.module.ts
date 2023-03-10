import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Actor Home Components
import { AgenthomeComponent } from './agent/agenthome/agenthome.component';
import { ClienthomeComponent } from './client/clienthome/clienthome.component';
import { CompanyhomeComponent } from './company/companyhome/companyhome.component';
//Login Components
import { AgentComponent } from './login/agent/agent.component';
import { ClientComponent } from './login/client/client.component';
import { CompanyComponent } from './login/company/company.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './login/user/user.component';
//Pages Components
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ErrorComponent } from './pages/error/error.component';
import { FeaturesComponent } from './pages/features/features.component';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [

  { path: 'Home', title: 'TruLyf | Home', component: HomeComponent },
  { path: 'About', title: 'TruLyf | About', component: AboutComponent },
  { path: 'Contact', title: 'TruLyf | Contact', component: ContactComponent },
  { path: 'Features', title: 'TruLyf | Features', component: FeaturesComponent },
  //Home Paths
  { path: 'Home/:clientName', title: 'TruLyf | Client Home', component: ClienthomeComponent },
  { path: 'Home/:agentName', title: 'TruLyf | Agent Home', component: AgenthomeComponent },
  { path: 'Home/:companyName', title: 'TruLyf | Company Home', component: CompanyhomeComponent },
  {
    path: 'Login', component: LoginComponent, children: [
      { path: 'User', title: 'TruLyf | User Login', component: UserComponent },
      { path: 'Client', title: 'TruLyf | Client Registration', component: ClientComponent },
      { path: 'Agent', title: 'TruLyf | Agent Registration', component: AgentComponent },
      { path: 'Company', title: 'TruLyf | Company Registration', component: CompanyComponent },
      { path: '', title: 'TruLyf | User Login', redirectTo: 'User', pathMatch: 'full' }
    ]
  },
  { path: '', title: 'TruLyf | Home', redirectTo: 'Home', pathMatch: 'full' },
  { path: '**', title: 'TruLyf | 404', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
