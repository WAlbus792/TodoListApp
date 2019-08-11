


// for AUTO-GENERATION!



/*
 * View model for entity "TodoList"
 */
export interface ITodoListViewModel {
    
    /*
     * Id
     */
    id: number;

    /*
     * Title
     */
    title: string;

    /*
     * Email of todo-list user
     */
    userEmail: string;
}
    
/*
 * View model for entity "TodoList"
 */
export class TodoListViewModel implements ITodoListViewModel {
    
    /*
     * Id
     */
    id: number;
    
    /*
     * Title
     */
    title: string;
    
    /*
     * Email of todo-list user
     */
    userEmail: string;
    
    constructor(data?: ITodoListViewModel) {
        
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
            this.userEmail = data["userEmail"]; 
        }
    }

    static fromJS (data: any): TodoListViewModel {
        data = typeof data === 'object' ? data : {};
        let result = new TodoListViewModel;
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        
        data["id"] = this.id;
        data["title"] = this.title;
        data["userEmail"] = this.userEmail;
        
        return data; 
    }
}    
