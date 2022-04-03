export interface Receivers {
  user_id: number;
  user_type: string;
}

export interface NotificationPayload {
  customer_name: string;
  order_number: string;
}

export interface NotificationArgs {
  sender_id: number;
  user_role: string;
  slug: string;
  receivers: Receivers[];
  metadata: {};
  payload: NotificationPayload;
}