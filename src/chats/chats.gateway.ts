import { Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({namespace:"11"})
export class ChatsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{ 
  private logger = new Logger("chat")
  constructor(){
    this.logger.log('constructor')
  }
  handleDisconnect(@ConnectedSocket() socket:Socket) {
    this.logger.log(`disconntectd : ${socket.id} ${socket.nsp.name}`)
  }
  handleConnection(@ConnectedSocket() socket:Socket) {
    this.logger.log(`conntectd : ${socket.id} ${socket.nsp.name}`)
  }
  afterInit() {
    this.logger.log('init')
  }
  @SubscribeMessage('new_user')
  //실행시켜주는 함수 
  //등록된 이벤트명이 같은지 확인하기
  handleMessage(@MessageBody() username:string, @ConnectedSocket() socket:Socket): string {
    
  //username db애 적재 
  socket.broadcast.emit("user_connected",username)
    return username;
  }

  @SubscribeMessage('submit_chat')
  //실행시켜주는 함수 
  //등록된 이벤트명이 같은지 확인하기
  handleSubmitChat(@MessageBody() chat:string, @ConnectedSocket() socket:Socket){
    
  //username db애 적재 
  socket.broadcast.emit("new_chat",{chat,username:socket.id})
  
  }
}
