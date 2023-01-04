import FileInput from './file-input';
import File from './file';
import CallBacks from './callbacks';
import Messages from './messages';

interface Uploader { 
    file : any;
    settings:any;
    chunksCount : number;
    currentChunk : number;
    CallBacks:CallBacks;
    FileReader:any;
    Messages : Messages
}

class Uploader implements Uploader {
    constructor(settings:any, CallBacks:CallBacks, Messages:Messages) {
        this.file = false;
        this.settings = settings;
        this.currentChunk = 0;
        this.CallBacks = CallBacks;
        this.FileReader = false;
        this.Messages = Messages;
    }

    async upload() {
        var res = false;
        var self = this;

        this.file.status = "uploading";
        self.CallBacks.callback("file_uploading", this);
        this.chunksCount = Math.ceil(this.file.file.size/ this.settings.fileChunkBytes);

        for (let chunkIter = 0; chunkIter < this.chunksCount; chunkIter++) {
            for (let retry = 0; retry < this.settings.retries; retry++) {
                this.currentChunk = chunkIter;
                
                this.CallBacks.callback("file_upload__chunk_start", {file: this.file, uploader: this});

                let chunkData = await this.readChunk();
                let input     = this.makeInput(chunkData);
                let junkRes = await this.sendChunk(input);

                if (junkRes === true) 
                    res = true;

                // No need for tetry
                if (res === true)
                    break;
            }

            if (res === false)
                break;
        }

            
        const promise = new Promise((resolve, reject) => {     
            if (res === true) {
                self.file.status  = "uploaded";
                self.CallBacks.callback("file_uploaded", this);
            }
            else {
                self.file.status = "upload_error";
                self.CallBacks.callback("file_upload_error", this);
                self.Messages.message("error", "File upload error", this);
            }

            self.CallBacks.callback("file_upload_end", this);

        
            resolve(res);
        });

        return promise;        
    }

    makeInput(base64:any) {
        
        let inputs = {
            file : {
                name :  this.file.file.name,
                size:   this.file.file.size,
                type:   this.file.file.type,
                source: this.file.file.source,
                lastModified : this.file.file.lastModified,
            },
            folder : this.settings.folder,
            ds_file_uploader : 1,
            ds_file_uploader__action : "upload",
            ds_file_type : "chunk",
            currentChunk : this.currentChunk,
            chunksCount  : this.chunksCount,
            chunkBase64  : base64,
            guid : this.file.guid,
            customVars : false
            
        }   

        
        if (typeof this.settings.customVars !== "undefined" && this.settings.customVars) {
            inputs.customVars = this.settings.customVars;
        }

        return inputs;

    }

    async readChunk() {
        var self = this;
        const promise = new Promise((resolve, reject) => {

            let offset = self.settings.fileChunkBytes * self.currentChunk;
            let length = self.settings.fileChunkBytes;
            let blob   = self.file.file.slice(offset, length + offset);

            self.FileReader = new FileReader();        
            self.FileReader.file = self.file;            

            self.FileReader.onload = async function() {
                let base64 = btoa(this.result)
                resolve(base64);
            }

            self.FileReader.readAsBinaryString(blob);

        });

        return promise;
    }

    async sendChunk(inputs:any) {
        var self = this; 

        var resolve = function(r:any) {};
        const promise = new Promise((r:any, reject:any) => { 
            resolve = r;
        });

        try {
            let uploadUrl       = this.settings.uploadUrl;
            let requrestHeaders = this.settings.requestHeaders;

            const rawResponse = await fetch(uploadUrl, {
                method: 'POST',
                headers: requrestHeaders,
                body: JSON.stringify(inputs)
            });
            
            const content = await rawResponse.json(); 
            if (content.status == "success") {
                self.CallBacks.callback("chunk_uploaded", this);
                resolve(true);
            }
            else {
                self.CallBacks.callback("chunk_upload_fail", this);
                
                if (typeof content.message != "undefined") {
                    self.file.errorMessage = content.message;
                }                        

                resolve(false);
            }
        }   
        catch(e) {
            self.CallBacks.callback("chunk_upload_fail", this);
            console.error("uploadFillFile Error", e);
            resolve(false);
        } 

       
        return promise;
        
    }
}

export default Uploader;