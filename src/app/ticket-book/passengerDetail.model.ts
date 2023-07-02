export class PassengerDetail{
    name:String
    age:String
    gender:String
    trainNo:number
    userEmail:String
    sourceStation:String
    destStation:String
    departureTime:String
    arrivalTime:String

    constructor(name:String,age:String,gender:String,trainNo:number,userEmail:String,
            sourceStation:String,destStation:String,departureTime:String,arrivalTime:String){
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.trainNo = trainNo;
        this.userEmail = userEmail;
        this.sourceStation = sourceStation;
        this.destStation = destStation;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
    }
}