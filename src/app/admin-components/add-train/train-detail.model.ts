export class TrainDetail{

    trainId:number;
    trainName:String;
    trainStart:String;
    trainEnd:String;
    totalSeats:number;
    capacityAC:number;
    capacitySL:number;
    fareSL:number;
    fareAC:number;
    stations:String[];

    constructor(trainId:number,trainName:String,trainStart:String,trainEnd:String,totalSeats:number,
        capacityAC:number,capacitySL:number,fareSL:number,fareAC:number,stations:String[]){
            this.trainId = trainId;
            this.trainName = trainName;
            this.trainStart = trainStart;
            this.trainEnd = trainEnd;
            this.totalSeats = totalSeats;
            this.capacityAC = capacityAC;
            this.capacitySL = capacitySL;
            this.fareSL = fareSL;
            this.fareAC = fareAC;
            this.stations = stations;
        }

}