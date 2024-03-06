export class RoomBookingDetails {
    public id: any;
    public roomNumber: any;
    public roomType: string;
    public price: number;
    public adultsCount: number;
    public childCount: number;
    public userId: number;
    public date: Date | undefined;

    constructor(id: any, roomNumber: number, roomType: string, price: number, adultsCount: number, childCount: number, userId: number, date: Date) {
        this.id = id;
        this.roomNumber = roomNumber;
        this.roomType = roomType;
        this.price = price;
        this.adultsCount = adultsCount;
        this.childCount = childCount;
        this.userId = userId;
        this.date = date;
    }
}
