import { Component, OnInit, ViewEncapsulation, Input } from "@angular/core";
import { GridDataResult, DataStateChangeEvent } from "@progress/kendo-angular-grid";
import { DataSourceRequestState } from "@progress/kendo-data-query";
import { MatDialog } from "@angular/material/dialog";
import { ComponentBase } from "../../core/component-base";
import { UserSessionProvider } from '../../core/user-session-provider';
import { TodoListsServiceProxy } from '../../core/service-proxies/TodoListsServiceProxy';
import { TodoListItemsServiceProxy } from '../../core/service-proxies/TodoListItemsServiceProxy';
import { TodoListItemCreateUpdateComponent } from '../shared-components/todo-list-item-create-update.component';
import { TodoListItemState, ITodoListItemStateModel, TodoListItemStateDictionariesMethods } from '../../core/dictionaries/TodoListItemState';
import { TodoListItemViewModel } from '../../core/models/TodoListItemViewModel';

@Component({
    selector: "todo-list-item-list",
    templateUrl: "./todo-list-item-list.component.html",
    encapsulation: ViewEncapsulation.None
})
export class TodoListItemListComponent extends ComponentBase implements OnInit {

    // #region Init

    constructor(
        private readonly todoListsService: TodoListsServiceProxy,
        private readonly todoListItemsService: TodoListItemsServiceProxy,
        private readonly userSessionProvider: UserSessionProvider,
        private dialog: MatDialog
    ) {
        super();
        this.allTodoListItemStates = TodoListItemStateDictionariesMethods.AllTodoListItemStateModels;
    }

    ngOnInit(): void {
        this.dataBind();
    }

    // #endregion Init

    // #region Fields and properties

    @Input('todo-list-id') todoListId: number;
    @Input('todo-list-user-email') todoListUserEmail: string;

    /**
     * All states of todo-list item
     */
    public allTodoListItemStates: ITodoListItemStateModel[];

    /**
     * Data to show in grid
     */
    todoListItems: GridDataResult;

    /**
     * State of grid 
     */
    state: DataSourceRequestState = {
        skip: 0,
        take: 10
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
     * Gets the data of the todo-lists
     **/
    async dataBind() {
        if (!this.isLoaded)
            this.blockPage();

        this.isBlocked = this.isLoaded;

        try {
            this.todoListItems = await this.todoListsService.getTodoListItems(this.todoListId, this.state).toPromise();
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

    public getStateNameByKey(key: TodoListItemState) {
        return TodoListItemStateDictionariesMethods.GetTodoListItemStateModelByKey(key).name;
    }

    /**
      * Removes the todo-list
      */
    async remove(id: number) {
        if (!await this.showConfirm("Do you really want to remove this todo-list item?"))
            return;

        this.isBlocked = true;
        try {
            await this.todoListItemsService.remove(id).toPromise();

            this.showSuccess("Todo-list item is removed successfully");
            this.dataBind();
        }
        catch (error) {
            this.parseAndShowError(error);
        }

        this.isBlocked = false;
    }

    public get isTodoListBelongToCurrentUser() {
        return this.todoListUserEmail === this.userSessionProvider.userName;
    }

    /**
     * Go to adding dialog 
     */
    goToAdding(): void {
        const modalRef = this.dialog.open(TodoListItemCreateUpdateComponent, TodoListItemCreateUpdateComponent.dialogConfig);
        modalRef.componentInstance.initAddingMode(this.todoListId);

        modalRef.afterClosed().subscribe((isSuccessful) => isSuccessful ? this.dataBind() : null);
    }

    /**
     * Go to editing dialog 
     */
    goToEditing(todoListItem: TodoListItemViewModel): void {
        const modalRef = this.dialog.open(TodoListItemCreateUpdateComponent, TodoListItemCreateUpdateComponent.dialogConfig);
        modalRef.componentInstance.initEditingMode(this.todoListId, todoListItem.id, todoListItem.title, todoListItem.state);

        modalRef.afterClosed().subscribe((isSuccessful) => isSuccessful ? this.dataBind() : null);
    }

    // #endregion Methods
}
