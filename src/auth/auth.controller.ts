import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserDecorator } from 'src/users/decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) { }


  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Res() res: Response, @UserDecorator() user: User) {
    return this.authService.signin(res, user);
  }

  // @UseGuards(JwtAuthGuard)
  // @HttpCode(HttpStatus.OK)
  // @Post('checkCookie')
  // checkCookie(@Req() req: Request) {
  //   return this.authService.checkCookie(req)
  // }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@UserDecorator() user: User) {
    return this.authService.logout(user)
  }

  // @UseGuards(JwtAuthGuard)
  // @HttpCode(HttpStatus.OK)
  // @Post('refresh')
  // refresh(@UserDecorator() user: User, @Req() req: Request) {
  //   return this.authService.checkCookie(req)
  // }

  // @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refreshToken')
  refreshToken(@Req() req: Request) {
    return this.authService.refreshToken(req)
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('profile')
  getProfile(@UserDecorator() user: User) {
    return user;
  }
}
