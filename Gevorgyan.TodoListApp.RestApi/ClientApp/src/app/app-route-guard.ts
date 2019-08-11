import { UserSessionProvider } from './core/user-session-provider';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild
} from "@angular/router";
import { Injectable } from "@angular/core";
import { UserRole } from './core/dictionaries/UserRole';

/**
 * Guard for only admin pages 
 */
@Injectable()
export class AdminRouteGuard implements CanActivate, CanActivateChild {

    constructor(private sessionProvider: UserSessionProvider, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        // we will have to redirect to the login page whether the session has not begun yet or the current user is not admin
        if (!this.sessionProvider.isSessionStarted || this.sessionProvider.role != UserRole.Admin) {
            this.router.navigate(["/login"]);
            return false;
        }

        return true;
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(childRoute, state);
    }
}

/**
 * Guard for internal pages (user pages and admin pages)
 */
@Injectable()
export class UserRouteGuard implements CanActivate, CanActivateChild {

    constructor(private sessionProvider: UserSessionProvider, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        // we will have to redirect to the login page whether the session has not begun yet or the current user is not simple user
        if (!this.sessionProvider.isSessionStarted || this.sessionProvider.role != UserRole.User) {
            this.router.navigate(["/login"]);
            return false;
        }

        return true;
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(childRoute, state);
    }
}

/**
 * Guard for internal pages (user pages and admin pages)
 */
@Injectable()
export class AppRouteGuard implements CanActivate, CanActivateChild {

    constructor(private sessionProvider: UserSessionProvider, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        // we will have to redirect to the login page whether the session has not begun yet
        if (!this.sessionProvider.isSessionStarted) {
            this.router.navigate(["/login"]);
            return false;
        }

        return true;
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(childRoute, state);
    }
}

/**
 * Guard for login page
 */
@Injectable()
export class LoginGuard implements CanActivate, CanActivateChild {

    constructor(private sessionProvider: UserSessionProvider, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if (this.sessionProvider.isSessionStarted) {
            if (this.sessionProvider.role == UserRole.Admin) // is this admin?
                this.router.navigate(["/admin/users"]);
            if (this.sessionProvider.role == UserRole.User) // is this a simple user?
                this.router.navigate(["/user/todo-lists"]);
            return false;
        }

        return true;
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(childRoute, state);
    }
}