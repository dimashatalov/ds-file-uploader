/*import FileInput from './file-input';*/

interface FileInput {
    dom  : any;
    settings:any;
    files:Array<File>;
}

class FileInput {
    constructor(obj : HTMLElement, settings:any) {
        this.dom = obj;
        this.settings = settings;
        

        this.listenEvents();
    }


    listenEvents() {
        let onInputFileChange = this.onInputFileChange.bind(this);
        
        this.dom.addEventListener("change", onInputFileChange);
    }

    onInputFileChange() {
        this.files = [...this.dom.files];

        if (typeof this.settings.onFileSelection != "undefined") {
            let f = this.settings.onFileSelection.bind(this);
            f();
        }
        
    }


}

export default FileInput;