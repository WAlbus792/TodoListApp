import { Component, ViewEncapsulation } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { MatDialogConfig } from "@angular/material/dialog";
import { ComponentBase } from "../../core/component-base";
import { TodoListItemsServiceProxy } from '../../core/service-proxies/TodoListItemsServiceProxy';
import { TodoListItemInputModel } from '../../core/models/TodoListItemInputModel';
import { TodoListItemState, ITodoListItemStateModel, TodoListItemStateDictionariesMethods } from '../../core/dictionaries/TodoListItemState';

@Component({
    selector: "todo-list-item-create-update.component",
    templateUrl: "./todo-list-item-create-update.component.html",
    encapsulation: ViewEncapsulation.None
})
export class TodoListItemCreateUpdateComponent extends ComponentBase {

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
        public dialogRef: MatDialogRef<TodoListItemCreateUpdateComponent>,
        private readonly todoListItemsService: TodoListItemsServiceProxy
    ) {
        super();
        this.allTodoListItemStates = TodoListItemStateDictionariesMethods.AllTodoListItemStateModels;
    }

    // #endregion Init

    // #region Fields and properties

    id: number;

    todoListId: number;

    title: string;
    oldTitle: string;

    state: TodoListItemState;
    oldState: TodoListItemState;

    /**
     * All states of todo-list item
     */
    public allTodoListItemStates: ITodoListItemStateModel[];

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
        return this.title !== this.oldTitle || this.state !== this.oldState;
    }

    // #endregion Fields and properties

    // #region Methods

    /**
     * Initializes adding mode
     */
    initAddingMode(todoListId: number): void {
        this.todoListId = todoListId;

        this.title = "";
        this.state = TodoListItemState.Open;
    }

    /**
     * Initializes editing mode
     */
    initEditingMode(todoListId: number, itemId: number, title: string, state: TodoListItemState): void {

        this.id = itemId;
        this.todoListId = todoListId;

        this.oldTitle = this.title = title;
        this.oldState = this.state = state;

        this.isEditing = true;
    }

    public getStateNameByKey(key: TodoListItemState) {
        return TodoListItemStateDictionariesMethods.GetTodoListItemStateModelByKey(key).name;
    }

    /**
     * Creates a todoList
     */
    async create() {
        this.isSaving = true;

        try {
            const input: TodoListItemInputModel = new TodoListItemInputModel();
            input.title = this.title;
            input.state = this.state;
            input.todoListId = this.todoListId;

            await this.todoListItemsService.create(input).toPromise();

            this.showSuccess("Todo-list item is added successfully");
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
            const input: TodoListItemInputModel = new TodoListItemInputModel();
            input.title = this.title;
            input.state = this.state;
            input.todoListId = this.todoListId;

            await this.todoListItemsService.update(this.id, input).toPromise();

            this.showSuccess("Todo-list item is updated successfully");
            this.dialogRef.close(true);
        }
        catch (error) {
            this.parseAndShowError(error);
        }

        this.isSaving = false;
    }

    // #endregion Methods
}

