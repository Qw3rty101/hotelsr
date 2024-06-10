export interface Order {
    id: number;
    id_room: number;
    id_facility: number;
    price_order: number;
    check_in: string;
    check_out: string;
    order_time: string;
    status_order: string;
    room?: any; // Tambahkan properti room dengan tipe any
    roomName?: string; // Tambahkan properti ini
    date?: string;
    time?: string;
    room_name?: string;
}
