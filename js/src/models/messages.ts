import CallBacks from './callbacks';

interface Messages {
    messages: any;
    CallBacks : CallBacks;
}

class Messages {
    constructor(CallBacks:CallBacks) {
        this.CallBacks = CallBacks;
        this.messages = [];
    }

    cleanMessages() {
        this.messages =[];
        this.CallBacks.callback("onMessageClean", this.messages);
        this.CallBacks.callback("onMessagesUpdate", this.messages);
    }

    message(status:string, msg:string, ref:any) {

        if (typeof ref === "undefined") 
            ref = false;

        this.messages.push({
            status : status,
            msg : msg,
            ref : ref
        });

        this.CallBacks.callback("newMessage", this.messages);
        this.CallBacks.callback("onMessagesUpdate", this.messages);

    }   
    
}

export default Messages; 