//      launchPublicFunction("onAllFilesReady");          
//      launchPublicFunction("onNewFilePush");

function DSFileUploader(formID, settings)
{
    var args = {};
    var plugins = {};
    
    const imageFormats = ["image/jpeg", "image/jpg", "image/png","image/gif"];
    const videoFormats = ["video/mp4"];

    const construct = function() {

        settings.get = get;
        settings.set = set;

        set("fileChunkBytes", 800000);
        set("retries", 10);
        set("uidPrefix", "no-preix");
        
        if (typeof settings.filesLimit != "undefined")
            set("filesLimit", settings.filesLimit);

        if (typeof settings.fileChunkBytes != "undefined")
            set("filesLimit", settings.fileChunkBytes);
            
            
        if (typeof settings.retries != "undefined")
            set("retries", settings.retries);            

        if (typeof settings.customVars != "undefined")
            set("customVars", settings.customVars);

        if (typeof settings.allowTypes != "undefined")
            set("allowTypes", settings.allowTypes);            

        detectRequestHeaders();
        detectUploadUrl();
        detectFolder();

        findFormObject();  
        findFormElements();
        findDropZones();
        findFormFileInputs();

        listenFileInputs();
        listenDropZones();

        connectPlugins();

        

    }

    const connectPlugins = function() {
        if (typeof DSFileManager !== "undefined") {

            if (typeof settings.fileManagerTarget === "undefined") {
                fileManagerTarget = formID + "__file-manager";
            }
            else  {
                fileManagerTarget = settings.fileManagerTarget;
            }

            plugins.dsFileManager = new DSFileManager({
                fileManagerTarget : fileManagerTarget,
                onFileDelete : function() {
                    areAllFilesLoaded();
                    launchPublicFunction("onFileDelete",false);
                }
            });
        }
    }

    const findFormObject = function() {
        let formObj = document.getElementById(formID);
        if (!formObj) {
            console.error("no form", formID);
        }
        
        set("formObj", formObj);        
    }

    const findFormElements = function() {
		let formElements = Array.from(get("formObj").elements);

		let elements = {};

		for (let i in formElements) {

			let element = formElements[i];
			let name    = element.getAttribute("name");
            let type    = element.getAttribute("type");           
            let ignore  = element.getAttribute("data-ignore");
			let val     = element.value;
            
            if (!name) continue;

            elements[name] = {value : val, name : name, obj : element, type : type, ignore : ignore};
		}

		set("elements", elements);
        return elements;
    }

    const findDropZones = function() {
        let dropZones = Array.from(get("formObj").querySelectorAll(".dropZone"));
        
        let zones = {};

        dropZones.map((zone) => {
            let name = zone.getAttribute("data-name");

            if (name) 
                zones[name] = { name : name, obj : zone};
        });

        set("dropZones", zones);
        return zones;
    }

    const addFile = function(file) {
        
        let files = get("files");
        
        let filesLimit = get("filesLimit");

        if (filesLimit !== false && filesLimit <= files.length) {
            return false;
        }

        let allowTypes = get("allowTypes");
        if (allowTypes !== false && !allowTypes.includes(file.type)) {        
            return false;
        }

        if (files === false) {
            files = [];
        }

        // Find file with same name to replace
        let isOverwritten = false;
        for (let i in files) {
            if (files[i].name === file.name) {
               files[i] = file;

               isOverwritten = true;
            }
        }

        if (isOverwritten === false)
            files.push(file);

        set("files", files);
        
    }

    const processFile = function(file) {
            
        
        file.loaded = 0;
        file.uploading = 0;
        file.uploaded = 0;
        file.pendingUpload = 0;
        file.uploadError = 0;
        file.currentChunk = 0;
        file.chunksCount = 0;
       

        file.fileReader = new FileReader();        
        file.fileReader.file = file;
        file.fileReader.onload = function() {
            if (this.file.size < 5000000) {
                this.file.base64 = this.result;
            }
            this.file.loaded = 1;

            areAllFilesLoaded();
            launchPublicFunction("onFileReady", false);
            updateFileManager();
        }

        setTimeout(function() {file.fileReader.readAsDataURL(file); },100);
        
        addFile(file);  
        
        
        
    }

    const launchPublicFunction = function(funcName, interrupt) {

        if (typeof settings[funcName] === "undefined") {
            return false;
        }

        let result = settings[funcName]();

        return result;
    }

    const areAllFilesLoaded = function() {
        let files = get("files");
        let filesCount  = files.length;
        let filesLoaded = 0;
        
        files.map((file)=> {
            if (file.loaded === 1) 
                filesLoaded++;
        });

        set("filesCount", filesCount);
        set("filesLoaded", filesLoaded);

        if (filesCount === filesLoaded)
            launchPublicFunction("onAllFilesReady");

        launchPublicFunction("onNewFilePush");

        if (typeof  plugins.dsFileManager !== "undefined") {
            let files = get("files");                    
            plugins.dsFileManager.setFiles(files);
            plugins.dsFileManager.drawFiles();
        }         
    }

    const updateFileManager = function() {

        launchPublicFunction("updateFileManager");

        if (typeof  plugins.dsFileManager !== "undefined") {
            let files = get("files");
            plugins.dsFileManager.setFiles(files);
            plugins.dsFileManager.drawFiles();        
        }
    }
    

    const onInputFileChange = function(e) {
        let input = this.input;
        
        let inputFiles = [...this.input.obj.files];

        for (let i in inputFiles) {
        
            let file = inputFiles[i];
            file.input  = input;
            file.source = "input";
      
            processFile(file);
                
        
        }
        
        
    }

    const onDrop = function(ev) {
        ev.preventDefault();

        let dropZone = this.dropZone;

        
        if (ev.dataTransfer.items) {
            
            // Use DataTransferItemList interface to access the file(s)
            [...ev.dataTransfer.items].forEach((item, i) => {
              // If dropped items aren't files, reject them
              if (item.kind === 'file') {
                var file = item.getAsFile();
                
                file.source = "drop";
                file.dropZone = dropZone;
                processFile(file);
              }
            });
        }
        else {
            
            // Use DataTransfer interface to access the file(s)
            [...ev.dataTransfer.files].forEach((file, i) => {
                file.source = "drop";
                file.dropZone = dropZone;
                processFile(file);
            });
        }

    }    

    const onDragOver = function(e) {
        e.preventDefault();
    }


    const listenFileInputs = function() {
        
        let inputs = get("fileInputs");
        
        for (let name in inputs) {
            let input = inputs[name];
        
            let onInputFileChangeTmp = onInputFileChange.bind({input:input});
            input.obj.addEventListener("change", onInputFileChangeTmp);
        };
        
    }

    const listenDropZones = function() {
        let dropZones = get("dropZones");

        for (let name in dropZones) {
            let dropZone = dropZones[name];

            let onDropTmp = onDrop.bind({dropZone:dropZone});
           
            dropZone.obj.addEventListener("dragenter", (event) => {event.preventDefault();});            
            dropZone.obj.addEventListener("drop", onDropTmp);
            dropZone.obj.addEventListener("dragover", function(e) { e.preventDefault();});            
            dropZone.obj.addEventListener("dragleave", function(e) { e.preventDefault();});        
            dropZone.obj.addEventListener("click", function(e) { this.value = null;});        

            
                
        }

    }

    const findFormFileInputs = function() {
        let elements = get("elements");

        let fileInputs = {};

        for (let name in elements) {
            if (elements[name].type === "file") {
                fileInputs[name] = elements[name];
            }
        }
        
        set("fileInputs", fileInputs);
        return fileInputs;
    }


    const upload = async function() {
        let retries = get("retries");
        let files = get("files");


        for (let i in files) {
            let file  = files[i];

            if (file.uploaded === 1) 
                continue;

            if (file.error === 1) {
                file.error = 0
                file.errorMessage = '';
            }
            
            file.pendingUpload = 1;

        }

        updateFileManager();

        let error = false;
        for (let i in files) {
            let file  = files[i];

            if (file.uploaded === 1)
                continue;

            if (file.size < get("fileChunkBytes")) {
                
                let res = false;
                for (let retry = 0; retry < retries; retry++) {

                    res = await uploadFullFile(file);
                    if (res === true) {
                        break; // no need retries
                    }

                    let wait = async function() {
            
                        const promise = new Promise((resolve, reject) => {            
                           setTimeout(function() {
                             resolve(true);}, 1000);
                        });
                
                        return promise;                        
                    }
                    await wait()
                }

                if (res === false) {
                    file.error = 1;
                    file.uploading = 0;
                    error = true;
                    updateFileManager();
                    
                }            
            } 
            else 
            if (file.size >=  get("fileChunkBytes")) {       
                let result = await uploadFileByParts(file);

                if (result === false) {

                    console.error("File was not uploaded, retry");
                   
                    file.uploading = 0;
                    file.uploaded = 0;
                    file.error = 1;
                    file.pendingUpload = 0;
                    error = true;

                    
                }   
            }
            else {
                console.error("Undefined error with file", file);
                continue;
            }
        }

    
        if (typeof settings.finishedWithErrors != "undefined" && error === true) {
            settings.finishedWithErrors();
        }     

        if (typeof settings.afterAllFilesUploaded != "undefined" && error === false) {
            settings.afterAllFilesUploaded();
        }        
    }

  

    this.upload = upload;

    const getGuid = function() {

        if (typeof crypto === "undefined") {
            let uid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
              });

            return get("uidPrefix")+'-' + uid;
        }
        else {
            let uid = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );

            return get("uidPrefix")+'-' + uid;
        }

    }

    const uploadFileByParts = async function(file) {
       
        var res = false;
        
        file.uploading   = 1;
        file.chunksCount = Math.ceil(file.size/ get("fileChunkBytes"));
        file.guid = getGuid();

        updateFileManager();

        let retries = get("retries");

        for (let chunkIter = 0; chunkIter < file.chunksCount; chunkIter++) {
            for (let retry = 0; retry < retries; retry++) {

                file.currentChunk = chunkIter;
                updateFileManager();
                res = await readSendChunk(file);

                if (res === true) 
                    break; // no need retries

            }

            if (res === false) {                    
                
                break;
            }
        }

        

            
        const promise = new Promise((resolve, reject) => {            
            
            if (res === true) {
                file.uploaded = 1;
                file.uploading = 0;
                file.pendingUpload = 0;
            }
            else {
                file.uploading = 0;
                file.error = 1;
                file.error = 1;                                                    
                file.pendingUpload = 0;
            }

            updateFileManager();  

            resolve(res);
        });

        return promise;
    }



    const readSendChunk = async function(file) {
        var resolve = false;

        const promise = new Promise((resolve, reject) => {            
            
            let offset =  get("fileChunkBytes") * file.currentChunk;
            let length =  get("fileChunkBytes");
            let blob = file.slice(offset, length + offset);
            
            file.fileReader = new FileReader();        
            file.fileReader.file = file;

            file.fileReader.onload = async function() {
                let base64 = btoa(this.result)

                let inputs = {
                    file : {
                        name : file.name,
                        size: file.size,
                        type: file.type,
                        source: file.source,
                        lastModified : file.lastModified,
                    },
                    folder : get("folder"),
                    ds_file_uploader : 1,
                    ds_file_type : "chunk",
                    currentChunk : file.currentChunk,
                    chunksCount  : file.chunksCount,
                    chunkBase64  : base64,
                    guid : file.guid,
                    
                }

                if (get("customVars") !== false)
                    inputs.customVars = get("customVars");



                try {
                    const rawResponse = await fetch(get("uploadUrl"), {
                        method: 'POST',
                        headers: get("requestHeaders"),
                        body: JSON.stringify(inputs)
                    });
                    
                    const content = await rawResponse.json(); 
                    if (content.status == "success") {

                        resolve(true);
                    }
                    else {

                        resolve(false);
                        if (typeof content.message != "undefined") {
                            file.errorMessage = content.message;
                        }                        
                    }
                }   
                catch(e) {
                    console.error("uploadFillFile Error", e);
                    resolve(false);
                }
            }

            file.fileReader.readAsBinaryString(blob);

        });

        return promise;

    }

    const uploadFullFile = async function(file) {


        file.guid = getGuid();
        file.uploading = 1;
        file.pendingUpload = 0;

        updateFileManager();

        const promise = new Promise((resolve, reject) => {

            file.uploading = 1;
            file.fileReader = new FileReader();        
            file.fileReader.file = file;
            file.fileReader.onload = async function() {

                let inputs = {
                    file : {
                        name : file.name,
                        size: file.size,
                        type: file.type,
                        source: file.source,
                        lastModified : file.lastModified,
                        base64 : this.result
                    },
                    folder : get("folder"),
                    ds_file_uploader : 1,
                    ds_file_type : "full-file",
                    guid : file.guid
                }

                if (get("customVars") !== false)
                    inputs.customVars = get("customVars");                

                try {
                    const rawResponse = await fetch(get("uploadUrl"), {
                        method: 'POST',
                        headers: get("requestHeaders"),
                        body: JSON.stringify(inputs)
                    });
                    
                    const content = await rawResponse.json(); 
                    if (content.status == "success") {
                        file.uploaded = 1;
                        file.uploading = 0;
                        file.pendingUpload = 0;
                        updateFileManager();

                        resolve(true);
                    }
                    else {
                        file.pendingUpload = 0;

                                         
                        file.errorMessage = "Server";
                        if (typeof content.message != "undefined") {
                            file.errorMessage = content.message;
                        }

                        updateFileManager();
                        resolve(false);
                    }
                }   
                catch(e) {
                    console.error("uploadFillFile Error", e);
                  
                    file.errorMessage = "Server";
                    file.pendingUpload = 0;                    
                    resolve(false);
                }
            }

            file.fileReader.readAsDataURL(file);
        
        });  
          
        
          return promise;
    }

    const detectFolder = function() {
        if (typeof settings.uploadUrl != "undefined") {
            set("folder", settings.folder);
        }
        else  {
            set("folder", "all-files");
        }
    }

    const detectUploadUrl = function() {
        if (typeof settings.uploadUrl != "undefined") {
            set("uploadUrl", settings.uploadUrl);
        }
        else  {
            set("uploadUrl", "/");
        }
    }


    const detectRequestHeaders = function() {
        if (typeof settings.headers != "undefined") {
            set("requestHeaders", settings.headers);
        }
        else  {
            set("requestHeaders", {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              });
        }
    }

    settings.getCleanFiles = function() {
        let files = get("files");
        let cleanFiles = [];

        for (let i = 0; i < files.length; i++ ) {
            let file = files[i];

            cleanFiles.push({
                base64 : file.base64,
                source: file.source,
                lastModified: file.lastModified,
                name : file.name,
                size : file.size,
                type : file.type
            });
        }

        return [...cleanFiles];
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


    this.set = set;
    this.get = get;
    
    construct();
}