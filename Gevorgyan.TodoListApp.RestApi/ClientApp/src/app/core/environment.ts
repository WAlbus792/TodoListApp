export let currentEnvironment: Environment;

/**
 * Environment for application
 **/
export class Environment {

    /**
     * url of server
     * */
    remoteServiceBaseUrl: string;

    /**
     * Version of app
     * */
    version: string;

    /**
     * Loads environment data
     * */
    static load() {
        var request = new XMLHttpRequest();
        request.open('GET', "../../environments/environment.json", false);
        request.send(null);

        currentEnvironment = JSON.parse(request.responseText);
    }
}