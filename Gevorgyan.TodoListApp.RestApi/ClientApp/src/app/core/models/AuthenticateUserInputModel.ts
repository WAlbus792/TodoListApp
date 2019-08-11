


// for AUTO-GENERATION!



/*
 * Input model of data for user authentication
 */
export interface IAuthenticateUserInputModel {
    
    /*
     * Email
     */
    userName: string;

    /*
     * Password
     */
    password: string;
}
    
/*
 * Input model of data for user authentication
 */
export class AuthenticateUserInputModel implements IAuthenticateUserInputModel {
    
    /*
     * Email
     */
    userName: string;
    
    /*
     * Password
     */
    password: string;
    
    constructor(data?: IAuthenticateUserInputModel) {
        
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            
            this.userName = data["userName"];
            this.password = data["password"]; 
        }
    }

    static fromJS (data: any): AuthenticateUserInputModel {
        data = typeof data === 'object' ? data : {};
        let result = new AuthenticateUserInputModel;
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        
        data["userName"] = this.userName;
        data["password"] = this.password;
        
        return data; 
    }
}    
