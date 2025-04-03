export interface Message {
  id?: number;
  username: string;
  data?: string;
  send_time?: string;
  error?: string;
  self?: boolean;
}
