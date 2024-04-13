import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { UserRepository } from './repo/user.respository';
import { User } from './entities/user.entity';
import { Constants } from 'src/utils/constants';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    let user: User = new User();
    user.email = createUserDto.email;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.password = createUserDto.password;
    user.role = Constants.ROLES.NORMAL_ROLE;
    return this.UserRepository.save(user);
  }
  findUserById(id: number) {
    return this.UserRepository.findOneOrFail({ where: { id: id } });
  }
  findAll() {
    return this.UserRepository.find();
  }
  findUserByEmai(email: string) {
    return this.UserRepository.findOne({ where: { email: email } });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return this.UserRepository.delete(id);
  }
}
