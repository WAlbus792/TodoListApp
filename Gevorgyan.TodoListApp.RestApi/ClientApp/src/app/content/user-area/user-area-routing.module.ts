import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAreaComponent } from './user-area.component';
import { TodoListComponent } from '../shared-components/todo-list.component';

const routes: Routes = [
    {
        path: '',
        component: UserAreaComponent,
        children: [
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
export class UserAreaRoutingModule {
}
