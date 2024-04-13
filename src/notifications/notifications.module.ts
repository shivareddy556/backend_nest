import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { Todo } from 'src/todo/entities/todo.entity';
import { Notification } from './entities/notification.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Notification])],
  controllers: [NotificationsController],
  providers: [NotificationsService],
  exports:[NotificationsService]
})
export class NotificationsModule {}
