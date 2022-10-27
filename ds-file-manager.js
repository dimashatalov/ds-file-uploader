function DSFileManager(settings)
{
    var args = {};
    this.settings = settings;
    this.setSettings = function(k, v) {
        settings[k] = v;
    }

    const construct = function() {
        
        drawHTML();
    }


    const setFiles = function(filesSource) {
        
        set("files", filesSource);
        
    }

    this.setFiles = function(filesSource) {
        setFiles(filesSource);   
    }

    const drawHTML =function() {
        
        let target = document.getElementById(settings.fileManagerTarget);

        if (!target) {
            console.log("There is no target/main div for DSFileManager");
            return false;
        }
     
        let mainContainer = document.createElement("div");
        mainContainer.classList.add("ds-file-manager");

        target.appendChild(mainContainer);

        set("mainContainer", mainContainer);
    }

    const drawFiles = function() {
        let html = ``;

        const imageFormats = ["image/jpeg", "image/jpg", "image/png","image/gif"];
        const videoFormats = ["video/mp4"];

        let files = get("files");
        let mainContainer = get("mainContainer");

        let domFiles =  Array.from(mainContainer.querySelectorAll(".ds-file-manager__file"));
        
        //Remove same file from dom
        for (let i in files) {
            let file = files[i];
            
            if (typeof file.isDrawn == "undefined") {
                for (let j in domFiles) {
                    
                    if (domFiles[j].getAttribute("data-name") === file.name) {
                        domFiles[j].remove();
                    }
                }
            }
        }


        for (let i in files) {
           let file = files[i];

           if (file.loaded !== 1) 
            continue;

            if (typeof file.isDrawn != "undefined" && file.isDrawn === true) {

                if (file.loaded === 1 && file.htmlDOM.loaded === 0) {
                    file.htmlDOM.loaded = 1;
                    file.htmlDOM.classList.remove("ds-file-manager__file--not-loaded");
                    file.htmlDOM.classList.add("ds-file-manager__file--loaded");
                }
                continue;
            }

           let htmlDOM =  document.createElement("div");
            htmlDOM.classList.add("ds-file-manager__file");
            
            if (file.loaded == 0) {
                htmlDOM.loaded = 0;
                htmlDOM.classList.add("ds-file-manager__file--not-loaded");
            }
            else 
            if (file.loaded == 1) {
                htmlDOM.loaded = 1;
                htmlDOM.classList.add("ds-file-manager__file--loaded");
            }
                
            htmlDOM.setAttribute("data-name", file.name);
            
            htmlDOM.basket = document.createElement("div");
            htmlDOM.basket.classList.add("ds-file-manager__delete");
            htmlDOM.basket.innerHTML = `
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                <g>
                    <g>
                        <polygon points="512,59.076 452.922,0 256,196.922 59.076,0 0,59.076 196.922,256 0,452.922 59.076,512 256,315.076 452.922,512 
                            512,452.922 315.076,256 		"/>
                    </g>
                </g>
                </svg>`;

            htmlDOM.name = document.createElement("div");
            htmlDOM.name.classList.add("ds-file-manager__name");
            htmlDOM.name.innerHTML = file.name;

            if (imageFormats.includes(file.type)) {
                htmlDOM.image = document.createElement("img");
                htmlDOM.image.classList.add("ds-file-manager__image");
                htmlDOM.image.src = file.base64;
            }
            else 
            if (videoFormats.includes(file.type)) {
                htmlDOM.video = document.createElement("video");
                htmlDOM.video.classList.add("ds-file-manager__video");
                htmlDOM.video.src = file.base64;
                htmlDOM.video.controls = true;
            }            
            else {
                htmlDOM.undefinedFile = document.createElement("div");
                htmlDOM.undefinedFile.classList.add("ds-file-manager__undefined-file");
                htmlDOM.undefinedFile.innerHTML = file.type;
            }

            htmlDOM.canvas = document.createElement("div");
            htmlDOM.canvas.classList.add("ds-file-manager__canvas")
            

            htmlDOM.appendChild(htmlDOM.canvas);            
            htmlDOM.canvas.appendChild(htmlDOM.basket);

            if (typeof htmlDOM.image !== "undefined")
                htmlDOM.canvas.appendChild(htmlDOM.image);
            
            if (typeof htmlDOM.video !== "undefined")
                htmlDOM.canvas.appendChild(htmlDOM.video);
            
            if (typeof htmlDOM.undefinedFile !== "undefined")
                htmlDOM.canvas.appendChild(htmlDOM.undefinedFile);

            htmlDOM.canvas.appendChild(htmlDOM.name);

            mainContainer.appendChild(htmlDOM);
            file.isDrawn = true;
            file.htmlDOM = htmlDOM;

           listenEvents(file);
        }
    }

    listenEvents = function(file) {
        
        file.htmlDOM.basket.addEventListener("click", function() {
            let files = get("files");
            
            for (let i in files) {
                if (files[i].name === file.name) {
                    files.splice(i,1);
                }
            }
            deleteFile(file);
        });
    }

    deleteFile = function(file) {

        file.htmlDOM.remove();

        launchPublicFunction("onFileDelete", false);
    }

    const launchPublicFunction = function(funcName, interrupt) {

        if (typeof settings[funcName] === "undefined") {
            return false;
        }

        let result = settings[funcName]();

        return result;
    }

    this.deleteFile = deleteFile;

    this.drawFiles = function(filesSource) {
        drawFiles();   
    }    

    const set = function(k, v) {
        args[k] = v;
    }
    
    const get = function(k) {
        if (typeof args[k] === "undefined") {
            return false;
        }
        return args[k];
    }  
    
    construct();
}