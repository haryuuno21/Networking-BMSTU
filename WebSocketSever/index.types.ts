import * as ws from "ws";
export interface Message {
    id?: number
    username: string
    data?: string
    send_time?: string
    error?: string
    self?: boolean
  }
  
export type Users = Record<string, Array<{
  id: number
  ws: ws.WebSocket
}>>