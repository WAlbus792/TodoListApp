


// for AUTO-GENERATION!


export enum UserType {
    Authenticated = 1,
    Anonymous = 2,
    System = 3
}

export interface IUserTypeModel {
	key: number;
	enumName: string;
	name: string;
}

export class UserTypeDictionariesMethods {
    static readonly AllUserTypeModels: IUserTypeModel [] = [
        { key: 1, enumName: 'Authenticated', name: 'Authenticated' },
        { key: 2, enumName: 'Anonymous', name: 'Anonymous' },
        { key: 3, enumName: 'System', name: 'System' }
    ];

    static GetUserTypeModelByKey(key: number): IUserTypeModel { 
	    var find = this.AllUserTypeModels.filter(x => x.key == key);
	    if (find.length > 0)
	        return find[0];
	    return null;
    }
}