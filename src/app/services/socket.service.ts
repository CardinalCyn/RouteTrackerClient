import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io'
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  
  constructor(private socket:Socket) { }
  //socket listener for reload event, causes client to make get requests for new routes
  reloadRoutes() {
    return this.socket.fromEvent('reloadRoutes')
  }
}
