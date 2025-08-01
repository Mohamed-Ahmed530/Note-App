import { Routes } from '@angular/router';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { notauthGuard } from './core/guards/notauth/notauth.guard';
import { AuthComponent } from './layout/auth/auth.component';
import { MainComponent } from './layout/main/main.component';

export const routes: Routes = [
    {path:"", redirectTo: "home", pathMatch:"full"},
    {path:"", component:AuthComponent, children:[
        {path:"login", canActivate:[notauthGuard], loadComponent: ()=> import("./pages/login/login.component").then( (c)=> c.LoginComponent ), title:"Login"},
        {path:"register", canActivate:[notauthGuard], loadComponent: ()=> import("./pages/register/register.component").then( (c)=> c.RegisterComponent  ), title:"register"}

    ] },
    {path:"", component:MainComponent, children:[
        {path:"home", canActivate:[authGuard], loadComponent: ()=> import("./pages/home/home.component").then( (c)=> c.HomeComponent ), title:"Home"},
        {path:"**", component:NotfoundComponent, title:"Notfound"}
    ]},
];
