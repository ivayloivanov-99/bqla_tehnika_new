import { OrderItemType } from "./OrderItemType";

export type OrderType = {
    id: number,
    user_id: number,
    email: string,
    phone: string,
    firstname: string,
    lastname: string,
    created_at: string,
    updated_at: string,
    completed_at: string,
    items: OrderItemType[]
};