export class TrainDetail{
    trainNo:number;
    trainId:number;
    trainName:String;
    trainStart:String;
    trainEnd:String;
    availableAC:number;
    availableSL:number;
    fareSL:number;
    fareAC:number;
    waitingSL:number;
    waitingAC:number;
    stations:String[];
    departureTime:String;
    arrivalTime:String;

    constructor(trainNo:number,trainId:number,trainName:String,trainStart:String,trainEnd:String,availableAC:number,
        availableSL:number,fareSL:number,fareAC:number,waitingSL:number,waitingAC:number,stations:String[],
        departureTime:String,arrivalTime:String){
        this.trainNo = trainNo;
        this.trainId = trainId;
        this.trainName = trainName;
        this.trainStart = trainStart;
        this.trainEnd = trainEnd;
        this.availableAC = availableAC;
        this.availableSL = availableSL;
        this.fareSL = fareSL;
        this.fareAC = fareAC;
        this.waitingAC = waitingAC;
        this.waitingSL = waitingSL;
        this.stations = stations;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
    }
}