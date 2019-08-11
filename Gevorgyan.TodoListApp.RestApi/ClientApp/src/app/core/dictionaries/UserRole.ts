


// for AUTO-GENERATION!


export enum UserRole {
    Admin = 1,
    User = 2
}

export interface IUserRoleModel {
	key: number;
	enumName: string;
	name: string;
}

export class UserRoleDictionariesMethods {
    static readonly AllUserRoleModels: IUserRoleModel [] = [
        { key: 1, enumName: 'Admin', name: 'Administrator' },
        { key: 2, enumName: 'User', name: 'User' }
    ];

    static GetUserRoleModelByKey(key: number): IUserRoleModel { 
	    var find = this.AllUserRoleModels.filter(x => x.key == key);
	    if (find.length > 0)
	        return find[0];
	    return null;
    }
}