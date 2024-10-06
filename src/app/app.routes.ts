import { DetailsComponent } from './components/details/details.component';
import { Routes } from '@angular/router';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { homeGuard } from './core/guards/home.guard';
import { AuthLayoutComponent } from './layoutes/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layoutes/blank-layout/blank-layout.component';

export const routes: Routes = [


{path:'' , component:AuthLayoutComponent , title:'auth' , canActivate:[homeGuard] , children:[
  {path:'' , redirectTo:'login' , pathMatch:'full' , title:'login'},
{path:'login' , component:LoginComponent , title:'login'},

{path:'signup' , loadComponent:()=>import('./components/register/register.component').then((c)=>c.RegisterComponent) , title:'signup'},

]},
{path:'' , component:BlankLayoutComponent , title:'auth', canActivate:[authGuard] , children:[

{path:'home' , component:HomeComponent , title:'home'},
{path:'change' , component:ChangepasswordComponent , title:'changePassword'},
{path:'change' ,loadComponent:()=>import('./components/changepassword/changepassword.component').then((c)=>c.ChangepasswordComponent) , title:'changePassword'},
{path:'profile' , loadComponent:()=>import('./components/profile/profile.component').then((c)=>c.ProfileComponent) , title:'profile'},
{path:'details/:id' , loadComponent:()=>import('./components/details/details.component').then((c)=>c.DetailsComponent) , title:'post'},


]},
{path:'**' , loadComponent:()=>import('./components/notfound//notfound.component').then((c)=>c.NotfoundComponent) , title:'NotFound'},


];
