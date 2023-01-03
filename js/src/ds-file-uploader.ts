import Form from './models/form';

/*
    File Upload response

    {status : "success"}
    {status : "error"}
*/

interface DSFileUploader {
    args:any;
    form:Form;
    CallBacks : any;
}


class DSFileUploader {

    constructor(formID:string,settings:any) {
        this.args = {};

        var settings = this.processSettings(settings);
        this.form = new Form(formID, settings);
        this.CallBacks = this.form.CallBacks;
        
    }

    getFileList() {
        console.log("getFileList", this.form.files);
        return this.form.files;
    }

    set(k:string,v:any) {

        this.args[k] = v;

    }

    get(k:string) {
        if (this.args[k])
            return this.args[k];
        else 
            return false;
    }

    getDefaultSettings():any {
        return {
            retries         : 10,
            filesLimit      : 10,
            fileChunkBytes  : 800000,

            uidPrefix: "no-prefix",
            folder : "all-files",

            //uploadUrl : location.href,
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
        
        const defaultSettings = this.getDefaultSettings();

        for (let settingsKey in defaultSettings) {
            if (typeof settings[settingsKey] !== "undefined") {
                this.set(settingsKey, settings[settingsKey]);
            }
            else{
                

                settings[settingsKey] = defaultSettings[settingsKey];
                this.set(settingsKey, defaultSettings[settingsKey]); 
            }
        }

        return settings;

    }
}

export  default DSFileUploader;