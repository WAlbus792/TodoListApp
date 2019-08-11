import { Component, ViewEncapsulation } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { MatDialogConfig } from "@angular/material/dialog";
import { ComponentBase } from "../../core/component-base";
import { UsersServiceProxy } from '../../core/service-proxies/UsersServiceProxy';
import { UpdateUserInputModel } from '../../core/models/UpdateUserInputModel';
import { CreateUserInputModel } from '../../core/models/CreateUserInputModel';

@Component({
    selector: "user-create-update.component",
    templateUrl: "./user-create-update.component.html",
    encapsulation: ViewEncapsulation.None
})
export class UserCreateUpdateComponent extends ComponentBase {

    // #region Dialog Config

    /**
     * Sets the dialog config
     */
    static dialogConfig: MatDialogConfig =
        {
            width: "600px",
            position: { top: "30px" },
            disableClose: true
        };

    // #endregion Dialog Config

    // #region Init

    constructor(
        public dialogRef: MatDialogRef<UserCreateUpdateComponent>,
        private readonly usersService: UsersServiceProxy
    ) {
        super();
    }

    // #endregion Init

    // #region Fields and properties

    userId: number;

    name: string;
    oldName: string;

    email: string;
    oldEmail: string;

    // for adding
    password: string;
    passwordConfirmation: string;

    /**
     * The saving process is begun?
     */
    isSaving: boolean = false;

    /**
     * The dialog is opened for editing?
     */
    isEditing: boolean = false;

    /**
     * Is there any changes?
     */
    get isChanged(): boolean {
        return this.name !== this.oldName ||
            this.email !== this.oldEmail;
    }

    // #endregion Fields and properties

    // #region Methods

    /**
     * Initializes adding mode
     */
    initAddingMode(): void {
        this.name = "";
        this.email = "";
        this.password = "";
        this.passwordConfirmation = "";
    }

    /**
     * Initializes editing mode
     */
    initEditingMode(id: number,
        name: string,
        email: string): void {

        this.userId = id;

        this.oldName = this.name = name;
        this.oldEmail = this.email = email;

        this.isEditing = true;
    }

    /**
     * Creates a user
     */
    async create() {
        this.isSaving = true;

        try {
            const input: CreateUserInputModel = new CreateUserInputModel();
            input.name = this.name;
            input.email = this.email;
            input.password = this.password;
            input.passwordConfirmation = this.passwordConfirmation;

            await this.usersService.create(input).toPromise();

            this.showSuccess("User is added successfully");
            this.dialogRef.close(true);
        }
        catch (error) {
            this.parseAndShowError(error);
        }

        this.isSaving = false;
    }

    /**
     * Update the user
     */
    async update() {
        this.isSaving = true;

        try {
            const input: UpdateUserInputModel = new UpdateUserInputModel();
            input.name = this.name;
            input.email = this.email;

            await this.usersService.update(this.userId, input).toPromise();

            this.showSuccess("User is updated successfully");
            this.dialogRef.close(true);
        }
        catch (error) {
            this.parseAndShowError(error);
        }

        this.isSaving = false;
    }

    // #endregion Methods
}

