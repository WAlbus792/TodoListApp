import { MenuConfig } from "../../core/config/menu";
import { UserSessionProvider } from '../../core/user-session-provider';

export class AdminMenuConfig extends MenuConfig {
    constructor() {
        super();

        this.config = {
            aside: {
                self: {},
                items: [
                    {
                        title: 'Users',
                        root: true,
                        icon: 'flaticon-avatar',
                        page: '/admin/users'
                    },
                    {
                        title: 'Todo-list',
                        root: true,
                        icon: 'flaticon-list',
                        page: '/admin/todo-lists'
                    },
                ]
            }
        };
    }
}
