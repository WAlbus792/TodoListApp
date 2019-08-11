


// for AUTO-GENERATION!


import { TodoListItemState } from '../dictionaries/TodoListItemState';

/*
 * Input model for creating/updating a todo-list item
 */
export interface ITodoListItemInputModel {
    
    /*
     * Title
     */
    title: string;

    /*
     * State of item ("open" or "closed")
     */
    state: TodoListItemState;

    /*
     * Id of todo-list entity
     */
    todoListId: number;
}
    
/*
 * Input model for creating/updating a todo-list item
 */
export class TodoListItemInputModel implements ITodoListItemInputModel {
    
    /*
     * Title
     */
    title: string;
    
    /*
     * State of item ("open" or "closed")
     */
    state: TodoListItemState;
    
    /*
     * Id of todo-list entity
     */
    todoListId: number;
    
    constructor(data?: ITodoListItemInputModel) {
        
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            
            this.title = data["title"];
            this.state = data["state"];
            this.todoListId = data["todoListId"]; 
        }
    }

    static fromJS (data: any): TodoListItemInputModel {
        data = typeof data === 'object' ? data : {};
        let result = new TodoListItemInputModel;
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        
        data["title"] = this.title;
        data["state"] = this.state;
        data["todoListId"] = this.todoListId;
        
        return data; 
    }
}    
