


// for AUTO-GENERATION!


export enum TodoListItemState {
    Open = 1,
    Closed = 2
}

export interface ITodoListItemStateModel {
	key: number;
	enumName: string;
	name: string;
}

export class TodoListItemStateDictionariesMethods {
    static readonly AllTodoListItemStateModels: ITodoListItemStateModel [] = [
        { key: 1, enumName: 'Open', name: 'Opened' },
        { key: 2, enumName: 'Closed', name: 'Closed' }
    ];

    static GetTodoListItemStateModelByKey(key: number): ITodoListItemStateModel { 
	    var find = this.AllTodoListItemStateModels.filter(x => x.key == key);
	    if (find.length > 0)
	        return find[0];
	    return null;
    }
}