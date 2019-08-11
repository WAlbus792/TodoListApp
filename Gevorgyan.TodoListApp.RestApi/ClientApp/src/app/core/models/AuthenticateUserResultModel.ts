


// for AUTO-GENERATION!


import { UserRole } from '../dictionaries/UserRole';

/*
 * Model of user authentication data for authorization
 */
export interface IAuthenticateUserResultModel {
    
    /*
     * Authorization token
     */
    accessToken: string;

    /*
     * User name
     */
    name: string;

    /*
     * User email
     */
    userName: string;

    /*
     * Role of user
     */
    role: UserRole;
}
    
/*
 * Model of user authentication data for authorization
 */
export class AuthenticateUserResultModel implements IAuthenticateUserResultModel {
    
    /*
     * Authorization token
     */
    accessToken: string;
    
    /*
     * User name
     */
    name: string;
    
    /*
     * User email
     */
    userName: string;
    
    /*
     * Role of user
     */
    role: UserRole;
    
    constructor(data?: IAuthenticateUserResultModel) {
        
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            
            this.accessToken = data["accessToken"];
            this.name = data["name"];
            this.userName = data["userName"];
            this.role = data["role"]; 
        }
    }

    static fromJS (data: any): AuthenticateUserResultModel {
        data = typeof data === 'object' ? data : {};
        let result = new AuthenticateUserResultModel;
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        
        data["accessToken"] = this.accessToken;
        data["name"] = this.name;
        data["userName"] = this.userName;
        data["role"] = this.role;
        
        return data; 
    }
}    
