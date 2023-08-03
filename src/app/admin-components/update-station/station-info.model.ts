export class StationInfo{
    stationId:number;
    trainFrom:string;
    trainTo:string;
    departureTime:string;
    arrivalTime:string;
    journeyFare:number;
    trainId:number;

    constructor(stationId:number,trainFrom:string,trainTo:string,departureTime:string,
        arrivalTime:string,journeyFare:number,trainId:number){
            this.stationId = stationId;
            this.trainFrom = trainFrom;
            this.trainTo = trainTo;
            this.departureTime = departureTime;
            this.arrivalTime = arrivalTime;
            this.journeyFare = journeyFare;
            this.trainId = trainId;
    }
}