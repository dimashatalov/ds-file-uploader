interface CallBacks {
    callbacks: any;
}

class CallBacks {
    constructor() {
        this.callbacks = [];
    }

    listen(action:string, f:any) {

        if (typeof this.callbacks[action] === "undefined") {
            this.callbacks[action] = [];
        }

        this.callbacks[action].push(f);
    }

    callback(action:string, data:any) {
        console.log("callback", action, data);
        if (typeof this.callbacks[action]  !== "undefined") {
            for (let i in this.callbacks[action]) {
                this.callbacks[action][i](data);
            }
        }
        
        action = "onCallBack";
        
        if (typeof this.callbacks[action]  !== "undefined") {
            for (let i in this.callbacks[action]) {
                this.callbacks[action][i]();
            }
        }        
    }   
    
}

export default CallBacks; 