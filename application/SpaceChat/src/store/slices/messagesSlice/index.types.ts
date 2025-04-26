export interface Message {
  id?: number;
  username: string;
  payload?: string;
  send_time?: string;
  has_error?: boolean;
  self?: boolean;
}
