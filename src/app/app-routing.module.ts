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
  { path: 'Login',title : 'TruLyf | Login', component: LoginComponent },
  { path: '', title: 'TruLyf | Home', redirectTo: 'Home', pathMatch: 'full' },
  { path: '**', title: 'TruLyf | 404', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
