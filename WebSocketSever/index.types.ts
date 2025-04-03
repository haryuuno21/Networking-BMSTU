import * as ws from "ws";
export interface MessageCard {
    id?: number
    username: string
    data?: string
    send_time?: string
    error?: string
  }
  
export type Users = Record<string, Array<{
  id: number
  ws: ws.WebSocket
}>>