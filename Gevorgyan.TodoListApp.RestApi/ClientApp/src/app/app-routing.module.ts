import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './content/login.component';
import { AppRouteGuard, LoginGuard, AdminRouteGuard, UserRouteGuard } from "./app-route-guard";

const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: "full" },
    { path: "login", component: LoginComponent, canActivate: [LoginGuard] },
    {
        path: 'admin',
        loadChildren: () => import('./content/admin-area/admin-area.module').then(m => m.AdminAreaModule),
        canActivate: [AdminRouteGuard]
    },
    {
        path: 'user',
        loadChildren: () => import('./content/user-area/user-area.module').then(m => m.UserAreaModule),
        canActivate: [UserRouteGuard]
    },
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
