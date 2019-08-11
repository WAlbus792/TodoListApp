


// for AUTO-GENERATION!



/*
 * Input model for updating user
 */
export interface IUpdateUserInputModel {
    
    /*
     * Name
     */
    name: string;

    /*
     * E-mail
     */
    email: string;
}
    
/*
 * Input model for updating user
 */
export class UpdateUserInputModel implements IUpdateUserInputModel {
    
    /*
     * Name
     */
    name: string;
    
    /*
     * E-mail
     */
    email: string;
    
    constructor(data?: IUpdateUserInputModel) {
        
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            
            this.name = data["name"];
            this.email = data["email"]; 
        }
    }

    static fromJS (data: any): UpdateUserInputModel {
        data = typeof data === 'object' ? data : {};
        let result = new UpdateUserInputModel;
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        
        data["name"] = this.name;
        data["email"] = this.email;
        
        return data; 
    }
}    
