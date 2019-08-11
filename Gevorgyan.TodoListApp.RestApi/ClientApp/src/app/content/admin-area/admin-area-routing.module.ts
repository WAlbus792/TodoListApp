import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAreaComponent } from './admin-area.component';
import { UserListComponent } from './user-list.component';
import { TodoListComponent } from '../shared-components/todo-list.component';

const routes: Routes = [
    {
        path: '',
        component: AdminAreaComponent,
        children: [
            {
                path: 'users',
                component: UserListComponent,
            },
{
                path: 'todo-lists',
                component: TodoListComponent,
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminAreaRoutingModule {
}
