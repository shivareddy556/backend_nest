import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger";
import { User } from "src/user/entities/user.entity";


@Controller("auth")
@ApiTags("Login")
export class AuthController{
constructor(private jwtService:JwtService){}

    @Post("/login")

    @UseGuards(AuthGuard("local"))
  
    login(@Req()req){
      const user:User= req.user
      const payload={
        userid:user.id,
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.email,
        role:user.role
      }
      return{token:this.jwtService.sign(payload)}
    }
}