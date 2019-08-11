import { NgModule } from "@angular/core";
import { AccountServiceProxy } from "./AccountServiceProxy";
import { UsersServiceProxy } from "./UsersServiceProxy";
import { TodoListsServiceProxy } from './TodoListsServiceProxy';
import { TodoListItemsServiceProxy } from './TodoListItemsServiceProxy';

@NgModule({
    providers: [
        AccountServiceProxy,
        UsersServiceProxy,
        TodoListsServiceProxy,
        TodoListItemsServiceProxy
    ]
})
export class ServiceProxyModule { }
