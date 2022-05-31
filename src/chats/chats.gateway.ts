import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class ChatsGateway { 
  @SubscribeMessage('new_user')
  //실행시켜주는 함수 
  //등록된 이벤트명이 같은지 확인하기
  handleMessage(@MessageBody() username:string, @ConnectedSocket() socket:Socket): string {
    console.log(username);
    console.log(socket.id);

    socket.emit('hello_user',`hello ${username}`)
    
    return 'Hello world!';
  }
}
