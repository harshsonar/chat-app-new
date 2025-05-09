import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000'); // Connect to backend WebSocket server
  }

  // Emit event with data
  emitEvent(event: string, data: any) {
    this.socket.emit(event, data);
  }

  // Listen for events from backend
  listen(event: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(event, (data) => {
        subscriber.next(data);
      });

      return () => {
        this.socket.off(event);
      };
    });
  }
}
