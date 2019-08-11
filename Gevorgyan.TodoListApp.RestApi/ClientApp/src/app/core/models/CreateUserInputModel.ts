


// for AUTO-GENERATION!



/*
 * Input model for creating user
 */
export interface ICreateUserInputModel {
    
    /*
     * E-mail
     */
    email: string;

    /*
     * Name
     */
    name: string;

    /*
     * Password
     */
    password: string;

    /*
     * Password confirmation
     */
    passwordConfirmation: string;
}
    
/*
 * Input model for creating user
 */
export class CreateUserInputModel implements ICreateUserInputModel {
    
    /*
     * E-mail
     */
    email: string;
    
    /*
     * Name
     */
    name: string;
    
    /*
     * Password
     */
    password: string;
    
    /*
     * Password confirmation
     */
    passwordConfirmation: string;
    
    constructor(data?: ICreateUserInputModel) {
        
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            
            this.email = data["email"];
            this.name = data["name"];
            this.password = data["password"];
            this.passwordConfirmation = data["passwordConfirmation"]; 
        }
    }

    static fromJS (data: any): CreateUserInputModel {
        data = typeof data === 'object' ? data : {};
        let result = new CreateUserInputModel;
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        
        data["email"] = this.email;
        data["name"] = this.name;
        data["password"] = this.password;
        data["passwordConfirmation"] = this.passwordConfirmation;
        
        return data; 
    }
}    
