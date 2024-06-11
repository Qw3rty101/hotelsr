// orders.data.ts

export interface Order {
  id_order: number;
  id: number;
  id_room: number;
  id_facility: number;
  price_order: number;
  check_in: string;
  check_out: string;
  order_time: string;
  status_order: string;
  order_at: string;
  created_at: string;
  updated_at: string;
}


export const ordersData = [
    // {
    //   id: 1,
    //   status: 'Booking',
    //   room: 'Date Room',
    //   date: '16/1/2024',
    //   time: '21.15'
    // },
    // {
    //   id: 2,
    //   status: 'Live',
    //   room: 'Private Room',
    //   date: '20/1/2024',
    //   time: '08.15'
    // },
    // {
    //   id: 3,
    //   status: 'Expired',
    //   room: 'Date Room',
    //   date: '16/1/2024',
    //   time: '21.15'
    // }
  ];
  