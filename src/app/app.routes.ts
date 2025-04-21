import { Routes } from '@angular/router';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { notauthGuard } from './core/guards/notauth/notauth.guard';

export const routes: Routes = [
    {path:"", redirectTo: "home", pathMatch:"full"},
    {path:"home", canActivate:[authGuard], loadComponent: ()=> import("./pages/home/home.component").then( (c)=> c.HomeComponent ), title:"Home"},
    {path:"login", canActivate:[notauthGuard], loadComponent: ()=> import("./pages/login/login.component").then( (c)=> c.LoginComponent ), title:"Login"},
    {path:"register", canActivate:[notauthGuard], loadComponent: ()=> import("./pages/register/register.component").then( (c)=> c.RegisterComponent  ), title:"register"},
    {path:"**", component:NotfoundComponent, title:"Notfound"}
];
