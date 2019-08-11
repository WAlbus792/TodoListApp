import { Component, ViewEncapsulation, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentBase } from '../core/component-base';
import { UserSessionProvider } from '../core/user-session-provider';
import { AccountServiceProxy } from '../core/service-proxies/AccountServiceProxy';
import { UserRole } from '../core/dictionaries/UserRole';
import { AuthenticateUserInputModel } from '../core/models/AuthenticateUserInputModel';

@Component({
    selector: '.m-grid.m-grid--hor.m-grid--root.m-page',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None
})
/** login component*/
export class LoginComponent extends ComponentBase {

    // #region Init

    constructor(private router: Router,
        private accountService: AccountServiceProxy,
        private userSessionProvider: UserSessionProvider) {
        super();
    }

    // #endregion

    // #region Fields and properties

    @HostBinding('class') classses: any = 'm-grid m-grid--hor m-grid--root m-page';

    /**
     * Email of user
     */
    userName: string;

    /**
     * Password of user
     */
    password: string;

    // #endregion Fields and properties

    // #region Methods

    async login() {
        this.blockPage();

        var authenticateInputData: AuthenticateUserInputModel = new AuthenticateUserInputModel();
        authenticateInputData.userName = this.userName;
        authenticateInputData.password = this.password;

        try {
            let autResult = await this.accountService.authenticate(authenticateInputData).toPromise();

            this.userSessionProvider.startSession(this.userName, autResult.accessToken, autResult.name, autResult.role);

            if (this.userSessionProvider.role == UserRole.Admin) // user is Admin?
                this.router.navigate(["/admin/users"]);
            if (this.userSessionProvider.role == UserRole.User) // otherwise is simple user?
                this.router.navigate(["/user/todo-lists"]);

        }
        catch (error) {
            this.parseAndShowError(error);
        }

        this.unblockPage();
    }

    // #endregion Methods  
}
