


// for AUTO-GENERATION!


import { TodoListItemState } from '../dictionaries/TodoListItemState';

/*
 * View model for entity "TodoListItem"
 */
export interface ITodoListItemViewModel {
    
    /*
     * Id
     */
    id: number;

    /*
     * Title
     */
    title: string;

    /*
     * State of item ("open" or "closed")
     */
    state: TodoListItemState;
}
    
/*
 * View model for entity "TodoListItem"
 */
export class TodoListItemViewModel implements ITodoListItemViewModel {
    
    /*
     * Id
     */
    id: number;
    
    /*
     * Title
     */
    title: string;
    
    /*
     * State of item ("open" or "closed")
     */
    state: TodoListItemState;
    
    constructor(data?: ITodoListItemViewModel) {
        
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            
            this.id = data["id"];
            this.title = data["title"];
            this.state = data["state"]; 
        }
    }

    static fromJS (data: any): TodoListItemViewModel {
        data = typeof data === 'object' ? data : {};
        let result = new TodoListItemViewModel;
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        
        data["id"] = this.id;
        data["title"] = this.title;
        data["state"] = this.state;
        
        return data; 
    }
}    
