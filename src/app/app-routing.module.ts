import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentComponent } from './login/agent/agent.component';
import { ClientComponent } from './login/client/client.component';
import { CompanyComponent } from './login/company/company.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './pages/about/about.component';

import { ContactComponent } from './pages/contact/contact.component';
import { ErrorComponent } from './pages/error/error.component';
import { FeaturesComponent } from './pages/features/features.component';
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [

  { path: 'Home', title: 'TruLyf | Home', component: HomeComponent },
  { path: 'About', title: 'TruLyf | About', component: AboutComponent },
  { path: 'Contact', title: 'TruLyf | Contact', component: ContactComponent },
  { path: 'Features', title: 'TruLyf | Features', component: FeaturesComponent },
  { path: 'SignUp', title: 'TruLyf | Sign Up', component: SignupComponent },
  { path: 'SignIn', title: 'TruLyf | Sign In', component: SigninComponent },
  {
    path: 'Login', component: LoginComponent, children: [
      { path: 'Client', title: 'TruLyf | Client Login', component: ClientComponent },
      { path: 'Agent', title: 'TruLyf | Agent Login', component: AgentComponent },
      { path: 'Company', title: 'TruLyf | Company Login', component: CompanyComponent },
      { path: '', title: 'TruLyf | Client Login', redirectTo: 'Client', pathMatch: 'full' },
      { path: '**', component : ErrorComponent }
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
