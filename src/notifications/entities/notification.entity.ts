import { Injectable } from "@nestjs/common";
import { Column, PrimaryGeneratedColumn } from "typeorm";

@Injectable()
export class Notification {
@PrimaryGeneratedColumn()
id:string

@Column()
title: string;

@Column({nullable:true})
notificationTimeStamp: string;

@Column({default:false})
notificationSent:boolean

@Column({nullable:true})
userID:string
}

