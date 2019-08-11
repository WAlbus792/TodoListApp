


// for AUTO-GENERATION!



/*
 * User view model
 */
export interface IUserViewModel {
    
    /*
     * Id
     */
    id: number;

    /*
     * E-mail
     */
    email: string;

    /*
     * Name
     */
    name: string;
}
    
/*
 * User view model
 */
export class UserViewModel implements IUserViewModel {
    
    /*
     * Id
     */
    id: number;
    
    /*
     * E-mail
     */
    email: string;
    
    /*
     * Name
     */
    name: string;
    
    constructor(data?: IUserViewModel) {
        
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
            this.email = data["email"];
            this.name = data["name"]; 
        }
    }

    static fromJS (data: any): UserViewModel {
        data = typeof data === 'object' ? data : {};
        let result = new UserViewModel;
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        
        data["id"] = this.id;
        data["email"] = this.email;
        data["name"] = this.name;
        
        return data; 
    }
}    
