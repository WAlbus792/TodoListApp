import { Injectable, EventEmitter } from "@angular/core";
import { UserRole } from './dictionaries/UserRole';

@Injectable()
export class UserSessionProvider {

    private userNameKey: string = "todo-list-app.userName";
    private tokenKey: string = "todo-list-app.token";
    private roleKey: string = "todo-list-app.role";
    private nameKey: string = "todo-list-app.name";

    private isSessionStartedKey: string = "todo-list-app.isSessionStarted";

    /**
     * Login (Email) of current user
     */
    public get userName(): string {
        return localStorage.getItem(this.userNameKey);
    }

    /**
     * Name of current user
     */
    public get name(): string {
        return localStorage.getItem(this.nameKey);
    }

    /**
     * Token of current user
     */
    public get token(): string {
        return localStorage.getItem(this.tokenKey);
    }

    /**
     * Role of current user
     */
    public get role(): UserRole {
        return UserRole[localStorage.getItem(this.roleKey)];
    }

    public get isSessionStarted(): boolean {
        return localStorage.getItem(this.isSessionStartedKey) != undefined;
    }

    /**
     * Begins a new session
     * @param userName User login
     * @param token User token
     * @param name User name
     * @param role User role
     */
    public startSession(userName: string, token: string, name: string, role: UserRole): void {
        localStorage.setItem(this.userNameKey, userName);
        localStorage.setItem(this.tokenKey, token);
        localStorage.setItem(this.nameKey, name);
        localStorage.setItem(this.roleKey, UserRole[role]);

        localStorage.setItem(this.isSessionStartedKey, "start");
    }

    /**
     * Finishes the session
     */
    public finishSession(): void {
        localStorage.clear();
    }
}
