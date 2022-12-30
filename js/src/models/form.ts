import FileInput from './file-input';

interface Form { 
    formID : string;
    formObject : any;
    fileInputs: Array<FileInput>;
}

class Form implements Form {
    constructor(formID:string) {
        this.formID = formID;
        this.fileInputs = [];

        this.findForm();
        this.findFileInputs();
    }


    findForm() {
        let formObject = document.getElementById(this.formID);
        
        if (!formObject) {
            throw new Error('No form');
        }

        this.formObject = formObject;
    }

    findFileInputs() {
        let formElements = Array.from(this.formObject.elements);

        formElements.map((element:HTMLElement) => {
            if (element.getAttribute("type") != "file")
                return false;
            else {
                this.fileInputs.push(new FileInput(element, {
                    onFileSelection : function() {
                        console.log("onFileSelection", this);
                    }
                }));
            }
            
        });
    }

    
}

export default Form;