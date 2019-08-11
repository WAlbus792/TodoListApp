import { ConfigModel } from '../interfaces/config';

export class LayoutConfig implements ConfigModel {
    public config: any = {
        "demo": "todo-items",
        "self": {
            "layout": "fluid",
            "background": "./assets/app/media/img/bg/bg-4.jpg"
        },
        "loader": {
            "enabled": true
        },
        "header": {
            "self": {
                "fixed": {
                    "desktop": true,
                    "mobile": true,
                    "minimize": {
                        "desktop": {
                            "enabled": false,
                            "offset": 200
                        },
                        "mobile": {
                            "enabled": false,
                            "offset": 200
                        }
                    }
                },
                "logo": {
                    "dark": "./assets/img/logo.svg",
                    "light": "./assets/img/logo.svg"
                }
            },
            "search": {
                "type": "search-dropdown",
                "dropdown": {
                    "skin": "light"
                }
            }
        },
        "aside": {
            "left": {
                "display": true,
                "fixed": true,
                "skin": "light",
                "push_footer": true,
                "minimize": {
                    "toggle": true,
                    "default": false
                }
            },
            "right": {
                "display": false
            }
        },
        "menu": {
            "header": {
                "display": true,
                "desktop": {
                    "skin": "light",
                    "arrow": true,
                    "toggle": "click",
                    "submenu": {
                        "skin": "light",
                        "arrow": true
                    }
                },
                "mobile": {
                    "skin": "dark"
                }
            },
            "aside": {
                "display": true,
                "desktop_and_mobile": {
                    "submenu": {
                        "skin": "inherit",
                        "accordion": true,
                        "dropdown": {
                            "arrow": true,
                            "hover_timeout": 500
                        }
                    },
                    "minimize": {
                        "submenu_type": "default"
                    }
                }
            }
        },
        "content": {
            "skin": "light2"
        },
        "footer": {
            "fixed": false
        },
        "quicksidebar": {
            "display": true
        },
        "portlet": {
            "sticky": {
                "offset": 50
            }
        }
    };

	constructor(config?: any) {
		if (config) {
			this.config = config;
		}
	}
}
