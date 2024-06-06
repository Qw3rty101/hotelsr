// room.interface.ts
export interface Room {
    id: number;
    name_room: string;
    price: number;
    rating: number[]; // Rating sebagai array angka
    short_desc: string;
    detail_desc: string;
    img_path: string;
    category_room: string;
    created_at: string;
    updated_at: string;
  }
  