import Form from './models/form';

interface DSFileUploader {
    args:any;
    form:Form;
}


class DSFileUploader {

    constructor(formID:string,settings:any) {
        this.args = {};

        this.processSettings(settings);
        this.form = new Form(formID);

        
    }

    set(k:string,v:any) {

        this.args[k] = v;

    }

    get(k:string) {

    }

    getDefaultSettings():any {
        return {
            retries         : 10,
            filesLimit      : 10,
            fileChunkBytes  : 800000,

            uidPrefix: "no-prefix",
            folder : "all-files",

            uploadUrl : location.href,

            customVars : {},
            allowTypes: new Array(),


            requestHeaders: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }

        }
    }

    processSettings(settings:any) {
        console.log("settings",settings);
        const defaultSettings = this.getDefaultSettings();

        for (let settingsKey in defaultSettings) {
            if (typeof settings[settingsKey] !== "undefined") 
                this.set(settingsKey, settings[settingsKey]);
            else
                this.set(settingsKey, defaultSettings[settingsKey]); 
        }

        console.log("this.args", this.args);
    }
}

export  default DSFileUploader;