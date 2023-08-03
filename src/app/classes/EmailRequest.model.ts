export class EmailRequest{
    to:String;
    subject:String;
    message:String;

    constructor(to:String,subject:String,messsage:String){
        this.to = to;
        this.subject = subject;
        this.message = messsage;
    }
}