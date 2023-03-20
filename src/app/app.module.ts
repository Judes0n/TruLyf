import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FeaturesComponent } from './pages/features/features.component';
import { ErrorComponent } from './pages/error/error.component';
import { AdminhomeComponent } from './admin/adminhome/adminhome.component';
import { ClienthomeComponent } from './client/clienthome/clienthome.component';
import { AgenthomeComponent } from './agent/agenthome/agenthome.component';
import { CompanyhomeComponent } from './company/companyhome/companyhome.component';
import { UserService } from './services/User/user.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './pages/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    FeaturesComponent,
    ErrorComponent,
    AdminhomeComponent,
    ClienthomeComponent,
    AgenthomeComponent,
    CompanyhomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
