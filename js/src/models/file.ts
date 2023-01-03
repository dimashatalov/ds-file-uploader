interface File {
    file : any;
    CallBacks: any;
    Messages: any;
    Uploader : any;
    settings : any;
    guid    : string;
    ready   : boolean;
    uploaded: boolean;
    status  : string;
}

class File {

    constructor(file:any, settings: any, CallBacks:any, Uploader:any, Messages:any) {
        this.file       = file;
        this.ready      = false;
        this.uploaded   = false;
        this.settings  = settings;
        this.guid      = this.getGuid();
        this.CallBacks = CallBacks;
        this.Uploader  = Uploader;            
        this.Uploader.file = this;
        this.status = "created";
        this.readFileThumb();
        this.Messages = Messages;
    }

    getGuid() {
        let uid = '';

        if (typeof crypto === "undefined") {
            uid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c:any) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
              });

            return this.settings.uidPrefix+'-' + uid;
        }
        else {
            let uid = (''+[1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, function(c:any) {
            return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
            });

            console.log("this.settings", this.settings);

            return this.settings.uidPrefix+'-' + uid;
        };
       
           
              
    }

    async delete(settings:any) {
        var self = this; 

        var resolve = function(r:any) {};
        const promise = new Promise((r:any, reject:any) => { 
            resolve = r;
        });

        try {
            let uploadUrl       = this.settings.uploadUrl;
            let requrestHeaders = this.settings.requestHeaders;

            let inputs = {
                folder      : this.settings.folder,
                guid        : this.file.guid,
                customVars  : false,
                ds_file_uploader      : 1,
                ds_file_uploader__action : "delete"    
            } 

            if (typeof settings.customVars != "undefined") {
                inputs.customVars = settings.customVars;
            }


            const rawResponse = await fetch(uploadUrl, {
                method: 'POST',
                headers: requrestHeaders,
                body: JSON.stringify(inputs)
            });
            
            const content = await rawResponse.json(); 

            if (typeof content.status !== "undefined" && content.status === "success") {
                this.file.status = "deleted";

                self.CallBacks.callback("delete_success", this);
                self.CallBacks.callback("delete_end", this);
                resolve(true);
            }
            else {
                self.CallBacks.callback("delete_error", this);
                self.Messages.message("error", "Delete error", this);
                self.CallBacks.callback("delete_end", this);
                resolve(false);
            }
        }
        catch(e) {
            self.CallBacks.callback("delete_fail", this);
            resolve(false); 
        }
    }

    readFileThumb() {
        var file = this.file;
        var self = this;

        file.fileReader = new FileReader();              
        file.fileReader.onload = function() {
            if (file.size < 5000000) {
                file.base64 = this.result;
            }
            else {
                file.base64 = false;
            }            

            self.ready = true;
            self.status = "ready";

            self.CallBacks.callback("file_ready", file);
        }

        setTimeout(function() {file.fileReader.readAsDataURL(file); },100);
    }
    

    async upload() {
        if (this.uploaded === false) {
            await this.Uploader.upload();
            
        }
    }
    
}

export default File; 