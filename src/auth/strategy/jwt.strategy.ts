import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy,ExtractJwt} from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly configService:ConfigService){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey: configService.get<string>('JWT_KEY'),
        })
    }
    async validate(payload:any){
        return{
            userid:payload.userid,
            firstName:payload.firstName,
            lastName:payload.lastName,
            email:payload.email,
            role:payload.role
        }
    }
}