import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { GridDataResult, DataStateChangeEvent } from "@progress/kendo-angular-grid";
import { DataSourceRequestState } from "@progress/kendo-data-query";
import { MatDialog } from "@angular/material/dialog";
import { TodoListCreateUpdateComponent } from "../shared-components/todo-list-create-update.component";
import { ComponentBase } from "../../core/component-base";
import { TodoListsServiceProxy } from "../../core/service-proxies/TodoListsServiceProxy";
import { TodoListViewModel } from '../../core/models/TodoListViewModel';
import { UsersServiceProxy } from '../../core/service-proxies/UsersServiceProxy';

@Component({
    selector: "todo-list",
    templateUrl: "./todo-list.component.html",
    encapsulation: ViewEncapsulation.None
})
export class TodoListComponent extends ComponentBase implements OnInit {

    // #region Init

    constructor(
        private readonly todoListsService: TodoListsServiceProxy,
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
    todoLists: GridDataResult;

    /**
     * State of grid 
     */
    state: DataSourceRequestState = {
        skip: 0,
        take: 10,
        sort: [
            { field: "title", dir: "asc" }
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
     * Gets the data of the todo-lists
     **/
    async dataBind() {
        if (!this.isLoaded)
            this.blockPage();

        this.isBlocked = this.isLoaded;

        try {
            this.todoLists = this.isUserAdmin()
                ? await this.todoListsService.getTodoLists(this.state).toPromise()
                : await this.usersService.getUserTodoLists(this.state).toPromise();
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
      * Removes the todo-list
      */
    async remove(id: number) {
        if (!await this.showConfirm("Do you really want to remove this todo-list?"))
            return;

        this.isBlocked = true;
        try {
            await this.todoListsService.remove(id).toPromise();

            this.showSuccess("Todo-list is removed successfully");
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
        const modalRef = this.dialog.open(TodoListCreateUpdateComponent, TodoListCreateUpdateComponent.dialogConfig);
        modalRef.componentInstance.initAddingMode();

        modalRef.afterClosed().subscribe((isSuccessful) => isSuccessful ? this.dataBind() : null);
    }

    /**
     * Go to editing dialog 
     */
    goToEditing(todoList: TodoListViewModel): void {
        const modalRef = this.dialog.open(TodoListCreateUpdateComponent, TodoListCreateUpdateComponent.dialogConfig);
        modalRef.componentInstance.initEditingMode(todoList.id, todoList.title);

        modalRef.afterClosed().subscribe((isSuccessful) => isSuccessful ? this.dataBind() : null);
    }

    // #endregion Methods
}
