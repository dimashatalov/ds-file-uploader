import FileInput from './file-input';
import File from './file';
import CallBacks from './callbacks';
import Uploader from './Uploader';
import Messages from './messages';

interface Form { 
    settings: any;
    formID : string;
    formObject : any;
    fileInputs: Array<FileInput>;
    files: Array<any>;
    CallBacks : any;
    Messages : Messages;
}

class Form implements Form {
    constructor(formID:string, settings:any) {
        this.settings = settings;
        this.formID = formID;
        this.fileInputs = [];
        this.files = [];
        this.findForm();
        this.findFileInputs();
        this.CallBacks = new CallBacks();
        this.Messages  = new Messages(this.CallBacks);

        this.hooks();
    }

    hooks() {
        this.CallBacks.listen("file_ready", function(data:any) {
            console.log("file ready", data);
        });

        this.CallBacks.listen("file_added", function(data:any) {
            console.log("file ready", data);
        });        
    }

    findForm() {
        let formObject = document.getElementById(this.formID);
        
        if (!formObject) {
            throw new Error('No form');
        }

        this.formObject = formObject;
    }

    isAllowed(file:any) {
        
        var file = file.file;

        if (typeof this.settings.allowTypes === "undefined")
            return true;

        let allowTypes = this.settings.allowTypes;
        
        if (allowTypes.includes(file.type)) {
            this.Messages.message("warning", "File type "+file.type+" is not allowed ", file);
            return true;
        }
        else {
            return false;
        }
    }

    isLimit() {
        if (typeof this.settings.filesLimit === "undefined")
            return false;

        if (this.settings.filesLimit <= this.files.length) {

            console.log("File quantity limit", this.settings.filesLimit +">="+ this.files.length);
            this.Messages.message("warning", "File limit is " + this.settings.filesLimit, false);
            return true;
        }
        return false;
    }

    isAutoUpload() {
        if (typeof this.settings.autoUpload === "undefined")
            return false;     
        else    
        if (this.settings.autoUpload === true) {
             return true;
        }
        else {
            return false;
        } 
    }

    findFileInputs() {
        let formElements = Array.from(this.formObject.elements);

        var self = this;

        formElements.map((element:HTMLElement) => {
            if (element.getAttribute("type") != "file")
                return false;
            else {
                this.fileInputs.push(new FileInput(element, {
                    onFileSelection : function() {

                        for (let i in this.files) {
                            
                            if (self.isLimit()) {
                                break;
                            }


                            let file = new File(this.files[i], 
                                self.settings,
                                self.CallBacks,
                                new Uploader(self.settings, self.CallBacks,self.Messages),
                                self.Messages
                                
                            );

                            if(self.isAllowed(file) === false) {
                                console.log("File is not allowed", file.file.name);
                                continue;
                            }
                        

                            self.files.push(file);

                            self.CallBacks.callback("file_added", file);

                            if (self.isAutoUpload()) {
                                file.upload();
                            }                            
                        }

                        console.log("self.files", self.files);
                    }
                }));
            }
            
        });

        
    }

    
}

export default Form;