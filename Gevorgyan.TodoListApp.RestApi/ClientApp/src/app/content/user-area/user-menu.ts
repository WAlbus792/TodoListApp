import { MenuConfig } from "../../core/config/menu";

export class UserMenuConfig extends MenuConfig {
    constructor() {
        super();

        this.config = {
            aside: {
                self: {},
                items: [
                    {
                        title: 'Todo-list',
                        root: true,
                        icon: 'flaticon-list',
                        page: '/user/todo-lists'
                    },
                ]
            }
        };
    }
}
