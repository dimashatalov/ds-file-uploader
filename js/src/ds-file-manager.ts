import CallBacks from './models/callbacks';
import slugify from 'slugify';

interface DSFileManager {
    targetID : string;
    settings: any;
    args:any;
    html : any;
    files: any;
    CallBacks:CallBacks
}
 

class DSFileManager {

    constructor(targetID:string, settings:any) {
        this.targetID = targetID;
        this.html = {};
        this.args = {}; 
        this.settings = settings;
        this.draw();
        this.files = this.settings.DSFileUploader.getFileList();
        this.listenHooks();

        this.CallBacks = new CallBacks();
    }

    listenHooks() {
        var self = this;
        this.settings.DSFileUploader.CallBacks.listen("file_added", function(data:any) {
            self.drawFiles();
        });

        this.settings.DSFileUploader.CallBacks.listen("file_ready", function(data:any) {
            console.log("this.settings.DSFileUploader", self.settings.DSFileUploader.form.files);
            self.drawFiles();
        });
        
        this.settings.DSFileUploader.CallBacks.listen("onCallBack", function() {
            
            self.drawFiles();
        });        
    }

    drawFiles() {
        var self = this;
        
        this.files = self.settings.DSFileUploader.form.files;
        console.log("drawFiles", this.files);
        this.files.map((file:any) => {
            if (typeof file.drawn === "undefined" && file.ready === true) {
                file.HTML = self.makeHTML(file);
                file.drawn = true;

                file.HTML.mainContainer.html.className = "ds-file-mamanger__file " + slugify(file.status);
            }
            else 
            if (file.drawn) {
                file.HTML.mainContainer.html.className = "ds-file-mamanger__file " + slugify(file.status);
            }

            // Draw custom html
            self.drawCustomHTML(file);
        });
    }


    drawCustomHTML(file:any)  {

        if (typeof this.settings.deleteHTML !== "undefined") {
            file.HTML.deleteIcon.html.innerHTML = this.settings.deleteHTML(file);
        }

        if (typeof this.settings.customHTML !== "undefined") {

            file.HTML.customContainer.html.innerHTML = this.settings.customHTML(file);
        }        
    }

    makeHTML(file:any) {
        file.HTML =  {
            mainContainer   : this.mainContainer(file),
            innerContainer  : this.innerContainer(file),
            imageContainer  : this.imageContainer(file),
            titleContainer  : this.titleContainer(file),
            typeContainer   : this.typeContainer(file),
            statusContainer : this.statusContainer(file),
            deleteIcon      : this.deleteIcon(file),
            customContainer : this.customContainer(file)
        }

        this.compileFile(file);

        this.html.mainDiv.appendChild(file.HTML.mainContainer.html);
        
        return file.HTML;
    }


    compileFile(file:any) {
        var self = this;

        file.HTML.mainContainer.html.appendChild(file.HTML.innerContainer.html);
        file.HTML.innerContainer.html.appendChild(file.HTML.titleContainer.html);

        if (file.file.base64 !== false ){
            file.HTML.innerContainer.html.appendChild(file.HTML.imageContainer.html);
        }
        else {
            file.HTML.innerContainer.html.appendChild(file.HTML.typeContainer.html);
        }

        file.HTML.innerContainer.html.appendChild(file.HTML.statusContainer.html);
        file.HTML.innerContainer.html.appendChild(file.HTML.deleteIcon.html);
        file.HTML.innerContainer.html.appendChild(file.HTML.customContainer.html);        

        file.HTML.deleteIcon.html.addEventListener("click", function() {
            console.log("delete_file", file);
            self.CallBacks.callback("delete_file", file);
                        
        })

        
    }

    mainContainer(file:any) {
        var self = this;

        let out = {
            html : document.createElement("div"),
            create : function() {
                this.html.classList.add("ds-file-mamanger__file")
            }
        }

        out.create();

        return out;
    }

    innerContainer(file:any) {
        var self = this;

        let out = {
            html : document.createElement("div"),
            create : function() {
                this.html.classList.add("ds-file-mamanger__file-inner")
            }
        }

        out.create();

        return out;
    }


    customContainer(file:any) {
        var self = this;

        let out = {
            html : document.createElement("div"),
            create : function() {
                this.html.classList.add("ds-file-mamanger__file-custom");
            
            }
        }

        out.create();

        return out; 
    }

    imageContainer(file:any) {
        var self = this;

        let out = {
            html : document.createElement("div"),
            img  : document.createElement("img"),
            create : function() {
                this.html.classList.add("ds-file-mamanger__file-image");

                if (file.file.base64 === false ) {

                }
                else {
                    this.img.src = file.file.base64;
                    this.html.appendChild(this.img);
                }
                
            }
        }

        out.create();

        return out;
    }

    titleContainer(file:any) {
        var self = this;

        let out = {
            html : document.createElement("div"),
            create : function() {
                this.html.classList.add("ds-file-mamanger__file-title")
                this.html.innerHTML = file.file.name;
            }
        }

        out.create();

        return out;
    }

    typeContainer(file:any) {
        var self = this;

        let out = {
            html : document.createElement("div"),
            create : function() {
                this.html.classList.add("ds-file-mamanger__file-type")
                this.html.innerHTML = file.file.type;
            }
        }

        out.create();

        return out;
    }

    statusContainer(file:any) {
        var self = this;

        let out = {
            html : document.createElement("div"),
            create : function() {
                this.html.classList.add("ds-file-mamanger__file-status")
                this.html.innerHTML = file.status;
            }
        }

        out.create();

        return out;
    }

    deleteIcon(file:any) {
        var self = this;

        let out = {
            html : document.createElement("div"),
            create : function() {
                this.html.classList.add("ds-file-mamanger__file-delete")
                this.html.innerHTML = "Delete";
            }
        }

        out.create();

        return out;
    }

    draw() {

        let mainDiv = document.createElement("div");
        mainDiv.classList.add("ds-file-manager__container");

        this.html.mainDiv = mainDiv;

        document.getElementById(this.targetID).appendChild(this.html.mainDiv);
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
}

export  default DSFileManager;