//      launchPublicFunction("onAllFilesReady");          
//      launchPublicFunction("onNewFilePush");

function DSFileUploader(formID, settings)
{
    var args = {};
    var plugins = {};
    
    const construct = function() {

        settings.get = get;
        settings.set = set;
                
        findFormObject();  
        findFormElements();
        findDropZones();
        findFormFileInputs();

        listenFileInputs();
        listenDropZones();

        connectPlugins();

        console.log("plugins", plugins);

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
            
        console.log("file file", file);
        file.loaded = 0;
        file.fileReader = new FileReader();
        
        file.fileReader.file = file;
        setTimeout(function() {file.fileReader.readAsDataURL(file); },100);
        
        file.fileReader.onload = function() {
            this.file.base64 = this.result;
            this.file.loaded = 1;

            areAllFilesLoaded();
            launchPublicFunction("onFileReady", false);
        }

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

        console.log("YEAA");
        if (ev.dataTransfer.items) {
            console.log("yes");
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
            console.log("noe");
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
        console.log("fileInputsfileInputs", fileInputs);
        set("fileInputs", fileInputs);
        return fileInputs;
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

    construct();
}