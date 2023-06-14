import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as argon2 from "argon2"
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { Response, Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private configService: ConfigService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  // REGISTER
  async signup(createUserDto: CreateUserDto) {

    const userExist = await this.usersRepository.findOneBy({ username: createUserDto.username })

    if (userExist) throw new UnauthorizedException('This user already exist')

    const password = await argon2.hash(createUserDto.password, { saltLength: 10, type: 1 })

    return await this.usersRepository.save({ ...createUserDto, password, roles: 2023 })
  }

  // LOGIN
  async signin(res: Response, user: User) {
    const payload = { username: user.username, sub: user.userId };

    const userExist = await this.usersRepository.findOne({ where: { userId: user.userId } })

    if (!userExist) throw new BadRequestException('Is smth went wrong?')

    const { accessToken, refreshToken } = await this.getTokens(user.userId, user.username)

    userExist.refreshToken = refreshToken

    await this.usersRepository.save(userExist)

    // SECURE COOKIE ONLY
    res.cookie('auth', refreshToken, {
      httpOnly: true,

      // production option:
      // secure: true
      // signed: true,
    });

    console.log('cookie set')

    return res.status(200).send({
      accessToken,
      roles: userExist.roles
    })

    // return {
    //   accessToken,
    //   roles: userExist.roles
    // };
    
  }

  // LOGOUT
  async logout(user: User) {
    await this.usersRepository.update(user, { refreshToken: null })

    return { message: 'logout successfully' }
  }

  // REFRESH TOKEN
  refresh(req: Request) {
    console.log('1')
    const token = this.checkCookie(req)
    console.log('2')
    console.log(token)
    const accessToken = this.getAccessToken(token.result)
    return accessToken
  }

  async getAccessToken(refreshToken: string) {

    const userExist = await this.usersRepository.findOne({ where: { refreshToken }})
    if(!userExist) throw new BadRequestException('Does this user exist?')
    if(userExist?.refreshToken !== refreshToken) throw new UnauthorizedException('Session expired')


    const accessToken = await this.jwtService.signAsync({
      sub: userExist.userId,
      username: userExist.username
    },
      {
        secret: this.configService.get('ACCESS_TOKEN'),
        algorithm: 'HS512',
        expiresIn: 20
      })
    return {
      accessToken,
    }
  }

  async getTokens(userId: number, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync({
        sub: userId,
        username
      },
        {
          secret: this.configService.get('ACCESS_TOKEN'),
          algorithm: 'HS512',
          expiresIn: 60 * 15
        }),
      this.jwtService.signAsync({
        sub: userId,
        username
      },
        {
          secret: this.configService.get('REFRESH_TOKEN'),
          algorithm: 'HS512',
          expiresIn: 60 * 60 * 24 * 7
        })
    ])
    return {
      accessToken,
      refreshToken
    }
  }

  async updateRtHash(userId: number, rt: string) {
    const refreshToken = await argon2.hash(rt, { type: 1, saltLength: 10 })

    const userExist = await this.usersRepository.findOne({ where: { userId } })

    if (!userExist) throw new BadRequestException('Does this user exist?')

    await this.usersRepository.update(userExist, { refreshToken })

  }

  
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    const passwordIsCorrect = await argon2.verify(user.password, pass)
    if (user && passwordIsCorrect) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Username or password are invalid. Try again.')
  }

  checkCookie(req: Request) {
    const result = req.headers.cookie.split(' ').map(row => row.split('=')).filter(cookie => cookie[0] === 'auth').flat()[1]
    if (!result) throw new UnauthorizedException('Session expired')
    return { result }
  }

}