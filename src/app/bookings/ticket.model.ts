export class Ticket{
    pnrNo:number;
    name:String;
    gender:String;
    age:number;
    seatNo:number;
    coach:String;
    seatType:String;
    trainNo:number;
    travelDate:String;
    trainName:String;
    departureTime:String;
    arrivalTime:String;
    source:String;
    destination:String;

    constructor(pnrNo:number,name:String,gender:String,age:number,seatNo:number,coach:String,
        seatType:String,trainNo:number,travelDate:String,trainName:String,departureTime:String,
        arrivalTime:String,source:String,destination:String){
        this.pnrNo = pnrNo;
        this.name = name;
        this.gender = gender;
        this.age = age;
        this.seatNo = seatNo;
        this.coach = coach;
        this.seatType = seatType;
        this.trainNo = trainNo;
        this.travelDate = travelDate;
        this.trainName = trainName;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.source = source;
        this.destination = destination;
    }

}