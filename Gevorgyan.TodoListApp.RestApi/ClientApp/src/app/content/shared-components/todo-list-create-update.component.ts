import { Component, ViewEncapsulation } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { MatDialogConfig } from "@angular/material/dialog";
import { ComponentBase } from "../../core/component-base";
import { TodoListsServiceProxy } from '../../core/service-proxies/TodoListsServiceProxy';
import { TodoListInputModel } from '../../core/models/TodoListInputModel';

@Component({
    selector: "todo-list-create-update.component",
    templateUrl: "./todo-list-create-update.component.html",
    encapsulation: ViewEncapsulation.None
})
export class TodoListCreateUpdateComponent extends ComponentBase {

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
        public dialogRef: MatDialogRef<TodoListCreateUpdateComponent>,
        private readonly todoListsService: TodoListsServiceProxy
    ) {
        super();
    }

    // #endregion Init

    // #region Fields and properties

    todoListId: number;

    title: string;
    oldTitle: string;

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
        return this.title !== this.oldTitle;
    }

    // #endregion Fields and properties

    // #region Methods

    /**
     * Initializes adding mode
     */
    initAddingMode(): void {
        this.title = "";
    }

    /**
     * Initializes editing mode
     */
    initEditingMode(id: number, title: string): void {

        this.todoListId = id;

        this.oldTitle = this.title = title;

        this.isEditing = true;
    }

    /**
     * Creates a todoList
     */
    async create() {
        this.isSaving = true;

        try {
            const input: TodoListInputModel = new TodoListInputModel();
            input.title = this.title;

            await this.todoListsService.create(input).toPromise();

            this.showSuccess("Todo-list is added successfully");
            this.dialogRef.close(true);
        }
        catch (error) {
            this.parseAndShowError(error);
        }

        this.isSaving = false;
    }

    /**
     * Update the todoList
     */
    async update() {
        this.isSaving = true;

        try {
            const input: TodoListInputModel = new TodoListInputModel();
            input.title = this.title;

            await this.todoListsService.update(this.todoListId, input).toPromise();

            this.showSuccess("Todo-list is updated successfully");
            this.dialogRef.close(true);
        }
        catch (error) {
            this.parseAndShowError(error);
        }

        this.isSaving = false;
    }

    // #endregion Methods
}

