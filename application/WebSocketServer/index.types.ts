import * as ws from "ws";
export interface Message {
    id?: number
    username: string
    payload?: string
    send_time?: string
    has_error?: boolean
    self?: boolean
  }
  
export type Users = Record<string, Array<{
  id: number
  ws: ws.WebSocket
}>>