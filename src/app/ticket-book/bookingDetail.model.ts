import { TrainDetail } from "../search/traindetail.model";

export class BookingDetail{
    train:TrainDetail
    seatType:String

    constructor(train:TrainDetail,seatType:String){
        this.train = train
        this.seatType = seatType
    }
}