export class BookingDetails {
    public userId: any;
    public date: Date | undefined;
    public bookedRooms: RoomDetails[] = [];

    constructor(userId: any, date: any) {
        this.userId = userId;
        this.date = date;
    }
}

export class RoomDetails {
    public id: any;
    public roomNumber: any;
    public roomType: string;
    public price: number;
    public adultsCount: number;
    public childCount: number;

    constructor(id: any, roomNumber: number, roomType: string, price: number, adultsCount: number, childCount: number) {
        this.id = id;
        this.roomNumber = roomNumber;
        this.roomType = roomType;
        this.price = price;
        this.adultsCount = adultsCount;
        this.childCount = childCount;
    }
}
