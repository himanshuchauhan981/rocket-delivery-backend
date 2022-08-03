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
  receivers: Receivers[];
  body: string;
  notification_template_id: number;
  metadata: any;
}
