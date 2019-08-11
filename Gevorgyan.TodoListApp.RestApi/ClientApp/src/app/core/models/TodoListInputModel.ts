


// for AUTO-GENERATION!



/*
 * Input model for creating a todo-list
 */
export interface ITodoListInputModel {
    
    /*
     * Title
     */
    title: string;
}
    
/*
 * Input model for creating a todo-list
 */
export class TodoListInputModel implements ITodoListInputModel {
    
    /*
     * Title
     */
    title: string;
    
    constructor(data?: ITodoListInputModel) {
        
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
        }
    }

    static fromJS (data: any): TodoListInputModel {
        data = typeof data === 'object' ? data : {};
        let result = new TodoListInputModel;
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        
        data["title"] = this.title;
        
        return data; 
    }
}    
