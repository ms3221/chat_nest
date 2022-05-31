import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from 'process';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatsGateway } from './chats/chats.gateway';
import { ChatsModule } from './chats/chats.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    MongooseModule.forRoot(process.env.MONGO_URL,{
      useNewUrlParser:true,
      useUnifiedTopology:true,
    }),
    ChatsModule
  ],
  controllers: [AppController],
  providers: [ChatsGateway],
})
export class AppModule {}
