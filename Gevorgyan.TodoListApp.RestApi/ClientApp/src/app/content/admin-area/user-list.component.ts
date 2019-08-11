import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { GridDataResult, DataStateChangeEvent } from "@progress/kendo-angular-grid";
import { DataSourceRequestState } from "@progress/kendo-data-query";
import { MatDialog } from "@angular/material/dialog";
import { UserCreateUpdateComponent } from "./user-create-update.component";
import { ComponentBase } from "../../core/component-base";
import { UsersServiceProxy } from "../../core/service-proxies/UsersServiceProxy";
import { UserViewModel } from '../../core/models/UserViewModel';

@Component({
    selector: "user-list",
    templateUrl: "./user-list.component.html",
    encapsulation: ViewEncapsulation.None
})
export class UserListComponent extends ComponentBase implements OnInit {

    // #region Init

    constructor(
        private readonly usersService: UsersServiceProxy,
        private dialog: MatDialog
    ) {
        super();
    }

    ngOnInit(): void {
        this.dataBind();
    }

    // #endregion Init

    // #region Fields and properties

    /**
     * Data to show in grid
     */
    users: GridDataResult;

    /**
     * State of grid 
     */
    state: DataSourceRequestState = {
        skip: 0,
        take: 10,
        sort: [
            { field: "name", dir: "asc" }
        ]
    };

    /**
     * Component loading is over?
     */
    isLoaded: boolean = false;

    /**
     * Grid is blocked?
     */
    isBlocked: boolean = false;

    // #endregion Fields and properties

    // #region Methods

    /**
     * Event handler occurring on grid state change (filtration, sorting, pagination)
     */
    dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.dataBind();
    }

    /**
     * Gets the data of the users
     **/
    async dataBind() {
        if (!this.isLoaded)
            this.blockPage();

        this.isBlocked = this.isLoaded;

        try {
            this.users = await this.usersService.getUsers(this.state).toPromise();
        }
        catch (error) {
            this.parseAndShowError(error);
        }

        this.isBlocked = false;
        if (!this.isLoaded) {
            this.unblockPage();
            this.isLoaded = true;
        }
    }

    /**
      * Removes the user
      */
    async remove(id: number) {
        if (!await this.showConfirm("Do you really want to remove this user?"))
            return;

        this.isBlocked = true;
        try {
            await this.usersService.remove(id).toPromise();

            this.showSuccess("User is removed successfully");
            this.dataBind();
        }
        catch (error) {
            this.parseAndShowError(error);
        }

        this.isBlocked = false;
    }

    /**
     * Go to adding dialog 
     */
    goToAdding(): void {
        const modalRef = this.dialog.open(UserCreateUpdateComponent, UserCreateUpdateComponent.dialogConfig);
        modalRef.componentInstance.initAddingMode();

        modalRef.afterClosed().subscribe((isSuccessful) => isSuccessful ? this.dataBind() : null);
    }

    /**
     * Go to editing dialog 
     */
    goToEditing(user: UserViewModel): void {
        const modalRef = this.dialog.open(UserCreateUpdateComponent, UserCreateUpdateComponent.dialogConfig);
        modalRef.componentInstance.initEditingMode(user.id, user.name, user.email);

        modalRef.afterClosed().subscribe((isSuccessful) => isSuccessful ? this.dataBind() : null);
    }

    // #endregion Methods
}
