function DSFileManager(settings)
{
    var args = {};

    this.settings = settings;
    this.setSettings = function(k, v) {
        settings[k] = v;
    }

    const imageFormats = ["image/jpeg", "image/jpg", "image/png","image/gif"];
    const videoFormats = ["video/mp4"];
    
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
            console.log("There is no target/main div for DSFileManager", settings.fileManagerTarget);
            return false;
        }
     
        let mainContainer = document.createElement("div");
        mainContainer.classList.add("ds-file-manager");

        target.appendChild(mainContainer);

        set("mainContainer", mainContainer);
    }

    const drawFiles = function() {
        let html = ``;
        console.log("drawFiles");
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


            if (typeof file.isDrawn != "undefined" && file.isDrawn === true) {

                isFileUploadingClass(file);
                isFileUploadedClass(file);
                isFilePendingClass(file);
                isFileErrorClass(file);
                hasErrorMessage(file);
                
                
                fileReadyToDrawInFileManager(file);

                fileLoadingProgress(file);

                continue; // Continue here, as file is not drawn 
            }
            

            // This part of code is launched when file is about to be displayed in file manager
            let htmlDOM =  document.createElement("div");
            htmlDOM.classList.add("ds-file-manager__file");
            
            // Is file ready on client side
            if (file.loaded == 0) {
                htmlDOM.loaded = 0;
                htmlDOM.classList.add("ds-file-manager__file--not-loaded");
            }
            else 
            if (file.loaded == 1) {
                htmlDOM.loaded = 1;
                htmlDOM.classList.add("ds-file-manager__file--loaded");
            }
                
            // Set file name
            htmlDOM.setAttribute("data-name", file.name);

            // Generate HTML
            
            // Delete Icon
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

            htmlDOM.appendChild(htmlDOM.basket);


            // Retry Icon
            /*
            htmlDOM.retry = document.createElement("div");
            htmlDOM.retry.classList.add("ds-file-manager__retry");
            htmlDOM.retry.innerHTML = `
               <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="30px" height="30px"><path d="M 15 3 C 8.9134751 3 3.87999 7.5533546 3.1132812 13.439453 A 1.0001 1.0001 0 1 0 5.0957031 13.697266 C 5.7349943 8.7893639 9.9085249 5 15 5 C 17.766872 5 20.250574 6.1285473 22.058594 7.9414062 L 20 10 L 26 11 L 25 5 L 23.470703 6.5292969 C 21.300701 4.3575454 18.309289 3 15 3 z M 25.912109 15.417969 A 1.0001 1.0001 0 0 0 24.904297 16.302734 C 24.265006 21.210636 20.091475 25 15 25 C 11.977904 25 9.2987537 23.65024 7.4648438 21.535156 L 9 20 L 3 19 L 4 25 L 6.0488281 22.951172 C 8.2452659 25.422716 11.436061 27 15 27 C 21.086525 27 26.12001 22.446646 26.886719 16.560547 A 1.0001 1.0001 0 0 0 25.912109 15.417969 z"/></svg>
               `;

            htmlDOM.appendChild(htmlDOM.retry);            
            */

            // Loading Animation
            htmlDOM.loading = document.createElement("div");
            htmlDOM.loading.classList.add("ds-file-manager__loading");                
            htmlDOM.loading.innerHTML =".";
            htmlDOM.appendChild(htmlDOM.loading);     
            
            // Error icon
            htmlDOM.error = document.createElement("div");
            htmlDOM.error.classList.add("ds-file-manager__error");                
            htmlDOM.error.innerHTML ='Error';
            htmlDOM.appendChild(htmlDOM.error);      
            
            // Uploaded ICON
            htmlDOM.uploaded = document.createElement("div");
            htmlDOM.uploaded.classList.add("ds-file-manager__uploaded");                
            htmlDOM.uploaded.innerHTML =`
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 17.837 17.837" style="enable-background:new 0 0 17.837 17.837;" xml:space="preserve">
                <g>
                    <path d="M16.145,2.571c-0.272-0.273-0.718-0.273-0.99,0L6.92,10.804l-4.241-4.27
                        c-0.272-0.274-0.715-0.274-0.989,0L0.204,8.019c-0.272,0.271-0.272,0.717,0,0.99l6.217,6.258c0.272,0.271,0.715,0.271,0.99,0
                        L17.63,5.047c0.276-0.273,0.276-0.72,0-0.994L16.145,2.571z"/>
                </g>
                </svg>
                `;
            htmlDOM.appendChild(htmlDOM.uploaded);     

            // Inser file name
            htmlDOM.name = document.createElement("div");
            htmlDOM.name.classList.add("ds-file-manager__name");
            htmlDOM.name.innerHTML = file.name;

            // Create container which will contain everything
            htmlDOM.canvas = document.createElement("div");
            htmlDOM.canvas.classList.add("ds-file-manager__canvas")
            

            htmlDOM.appendChild(htmlDOM.canvas);            
            htmlDOM.canvas.appendChild(htmlDOM.name);
            mainContainer.appendChild(htmlDOM);

            
            file.isDrawn = true;
            file.htmlDOM = htmlDOM;

            if (file.loaded == 1) {
                drawReadyFileContent(file);
            }

           listenEvents(file);
        }
    }

    const fileReadyToDrawInFileManager = function(file) {

        if (file.loaded === 1 && file.htmlDOM.loaded === 0) 
        {
            let htmlDOM = file.htmlDOM;

            file.htmlDOM.loaded = 1;
            file.htmlDOM.classList.remove("ds-file-manager__file--not-loaded");
            file.htmlDOM.classList.add("ds-file-manager__file--loaded");
            

            drawReadyFileContent(file);
        }
    }

    const fileLoadingProgress = function(file) {
        if (typeof file.chunksCount === 0) {
            file.htmlDOM.loading.innerHTML = ".";
        }
        else {
            file.htmlDOM.loading.innerHTML = (~~((file.currentChunk/(file.chunksCount-1))*100))+"%";
        }
    }

    const filterErrorMessage = function(message) {
        return message;
    }

    this.filterErrorMessage = filterErrorMessage;

    const hasErrorMessage = function(file) {
            
        file.errorMessage = filterErrorMessage(file.errorMessage);

        if (typeof file.errorMessage !== "undefined")
            file.htmlDOM.error.innerHTML = '<div class="ds-file-manager__file__error-message">'+file.errorMessage+'</div>';        
        
    }

    const isFileErrorClass = function(file) {                    
        if (file.error === 1) 
            file.htmlDOM.classList.add("ds-file-manager__file--error");
        else 
            file.htmlDOM.classList.remove("ds-file-manager__file--error"); 
    }

    const isFilePendingClass = function(file) {                    
        if (file.pendingUpload === 1) 
            file.htmlDOM.classList.add("ds-file-manager__file--pending-upload");
        else 
            file.htmlDOM.classList.remove("ds-file-manager__file--pending-upload"); 
    }

    const isFileUploadedClass = function(file) {
        if (file.uploaded === 1) {
            file.htmlDOM.classList.add("ds-file-manager__file--uploaded");
        }
        else 
            file.htmlDOM.classList.remove("ds-file-manager__file--uploaded");
    }

    const isFileUploadingClass = function(file) {
        if (file.uploading === 1) 
            file.htmlDOM.classList.add("ds-file-manager__file--uploading");
        else 
            file.htmlDOM.classList.remove("ds-file-manager__file--uploading");
    }

    const drawReadyFileContent = function(file) {
        let htmlDOM = file.htmlDOM;

        if (imageFormats.includes(file.type)) {
            htmlDOM.image = document.createElement("img");
            htmlDOM.image.classList.add("ds-file-manager__image");
            htmlDOM.image.src = file.base64;
            htmlDOM.canvas.appendChild(htmlDOM.image);
        }
        else 
        if (videoFormats.includes(file.type)) {
            htmlDOM.video = document.createElement("video");
            htmlDOM.video.classList.add("ds-file-manager__video");
            htmlDOM.video.src = file.base64;
            htmlDOM.video.controls = true;
            htmlDOM.canvas.appendChild(htmlDOM.video);
        }            
        else {
            htmlDOM.undefinedFile = document.createElement("div");
            htmlDOM.undefinedFile.classList.add("ds-file-manager__undefined-file");
            htmlDOM.undefinedFile.innerHTML = file.type;
            htmlDOM.canvas.appendChild(htmlDOM.undefinedFile);
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